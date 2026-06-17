import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { products as initialProducts } from '../data/products';
import { supabase } from '../lib/supabase';

const StoreContext = createContext(null);
const PRODUCTS_KEY = 'mdc_admin_products';
const CREDENTIALS_KEY = 'mdc_admin_credentials';
const AUTH_KEY = 'mdc_admin_authenticated';
const CART_KEY = 'mdc_cart';

const defaultCredentials = { username: 'admin', password: 'admin123' };

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toast, setToast] = useState(null);
  const [adminProducts, setAdminProducts] = useState(() => readJson(PRODUCTS_KEY, []));
  const [adminCredentials, setAdminCredentials] = useState(() => readJson(CREDENTIALS_KEY, defaultCredentials));
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [cart, setCart] = useState(() => readJson(CART_KEY, []));

  useEffect(() => {
    const loadSupabaseProducts = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch failed', error);
        return;
      }
      if (!data) return;

      const formatted = data.map(row => ({
        ...row,
        price: Number(row.price),
        origPrice: row.orig_price != null ? Number(row.orig_price) : undefined,
        available: Boolean(row.available),
        bestseller: Boolean(row.bestseller),
        specs: row.specs || {},
        imageUrl: row.image_url || '',
        addedByAdmin: Boolean(row.added_by_admin),
      }));

      setAdminProducts(formatted);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(formatted));
    };

    loadSupabaseProducts();
  }, []);

  const products = useMemo(() => [...adminProducts, ...initialProducts], [adminProducts]);
  const cartItems = useMemo(() => {
    return cart
      .map(item => {
        const product = products.find(p => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);
  }, [cart, products]);
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  const showToast = useCallback((message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from wishlist');
      } else {
        next.add(productId);
        showToast('Added to wishlist ❤️');
      }
      return next;
    });
  }, [showToast]);

  const isWishlisted = useCallback((productId) => wishlist.has(productId), [wishlist]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.available) {
      showToast('This product is currently out of stock');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      const next = existing
        ? prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...prev, { productId: product.id, quantity }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
    showToast('Added to cart');
  }, [showToast]);

  const updateCartQuantity = useCallback((productId, quantity) => {
    setCart(prev => {
      const next = quantity <= 0
        ? prev.filter(item => item.productId !== productId)
        : prev.map(item => item.productId === productId ? { ...item, quantity } : item);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const next = prev.filter(item => item.productId !== productId);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
    showToast('Removed from cart');
  }, [showToast]);

  const clearCart = useCallback(() => {
    localStorage.removeItem(CART_KEY);
    setCart([]);
    showToast('Cart cleared');
  }, [showToast]);

  const addToRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  const addProduct = useCallback(async (product) => {
    const nextProduct = {
      name: product.name.trim(),
      desc: product.desc.trim(),
      price: Number(product.price),
      orig_price: product.origPrice ? Number(product.origPrice) : undefined,
      category: product.category,
      emoji: product.emoji?.trim() || 'Product',
      image_url: product.imageUrl?.trim() || '',
      images: product.imageUrl?.trim()
        ? [product.imageUrl.trim()]
        : [product.emoji?.trim() || 'Product'],
      available: Boolean(product.available),
      bestseller: Boolean(product.bestseller),
      specs: product.specs || {},
      added_by_admin: true,
    };

    const { data, error } = await supabase.from('products').insert([{ ...nextProduct }]).select().single();

    if (error || !data) {
      showToast('Failed to add product to Supabase');
      return null;
    }

    const inserted = {
      ...data,
      price: Number(data.price),
      origPrice: data.origPrice != null ? Number(data.origPrice) : undefined,
      available: Boolean(data.available),
      bestseller: Boolean(data.bestseller),
      specs: data.specs || {},
      addedByAdmin: true,
    };

    setAdminProducts(prev => {
      const next = [inserted, ...prev];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      return next;
    });
    showToast('Product added successfully');
    return inserted;
  }, [showToast]);

  const removeAdminProduct = useCallback(async (productId) => {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      showToast('Failed to remove product from Supabase');
      return;
    }

    setAdminProducts(prev => {
      const next = prev.filter(product => product.id !== productId);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      return next;
    });
    showToast('Product removed');
  }, [showToast]);

  const updateAdminProduct = useCallback(async (productId, updates) => {
    const formattedUpdates = {
      ...updates,
      price: updates.price != null ? Number(updates.price) : undefined,
      orig_price: updates.origPrice != null ? Number(updates.origPrice) : undefined,
      image_url: updates.imageUrl?.trim() || undefined,
      available: Boolean(updates.available),
      bestseller: Boolean(updates.bestseller),
    };

    const { data, error } = await supabase.from('products').update(formattedUpdates).eq('id', productId).select().single();
    if (error || !data) {
      showToast('Failed to update Supabase product');
      return null;
    }

    const updated = {
      ...data,
      price: Number(data.price),
      origPrice: data.origPrice != null ? Number(data.origPrice) : undefined,
      available: Boolean(data.available),
      bestseller: Boolean(data.bestseller),
      specs: data.specs || {},
      addedByAdmin: true,
    };

    setAdminProducts(prev => {
      const next = prev.map(p => p.id === productId ? updated : p);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      return next;
    });
    showToast('Product updated');
    return updated;
  }, [showToast]);

  const loginAdmin = useCallback((username, password) => {
    const valid = username === adminCredentials.username && password === adminCredentials.password;
    if (valid) {
      localStorage.setItem(AUTH_KEY, 'true');
      setAdminAuthenticated(true);
      showToast('Welcome back, admin');
    }
    return valid;
  }, [adminCredentials, showToast]);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAdminAuthenticated(false);
    showToast('Signed out');
  }, [showToast]);

  const updateAdminCredentials = useCallback((username, password) => {
    const next = { username: username.trim(), password };
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(next));
    setAdminCredentials(next);
    showToast('Admin credentials updated');
  }, [showToast]);

  return (
    <StoreContext.Provider value={{
      products,
      adminProducts,
      addProduct,
      removeAdminProduct,
      updateAdminProduct,
      wishlist,
      wishlistCount: wishlist.size,
      toggleWishlist,
      isWishlisted,
      cart,
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      recentlyViewed,
      addToRecentlyViewed,
      toast,
      showToast,
      adminAuthenticated,
      adminUsername: adminCredentials.username,
      loginAdmin,
      logoutAdmin,
      updateAdminCredentials,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
