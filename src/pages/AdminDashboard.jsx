import { useMemo, useState } from 'react';
import {
  FiActivity,
  FiBox,
  FiCheckCircle,
  FiGrid,
  FiImage,
  FiLock,
  FiLogOut,
  FiPackage,
  FiPlus,
  FiShield,
  FiStar,
  FiTrash2,
  FiTrendingUp,
} from 'react-icons/fi';
import { categories } from '../data/categories';
import { useStore } from '../hooks/useStore';

const initialProductForm = {
  name: '',
  category: 'Earrings',
  price: '',
  origPrice: '',
  desc: '',
  emoji: '*',
  imageUrl: '',
  available: true,
  bestseller: false,
  specsText: '',
};

const fieldStyle = {
  width: '100%',
  border: '1px solid #e7d8e8',
  borderRadius: '6px',
  padding: '0.7rem 0.78rem',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.88rem',
  color: '#2d2430',
  outline: 'none',
  background: '#fff',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#7b3d82',
  marginBottom: '0.42rem',
};

const buttonStyle = {
  border: 'none',
  borderRadius: '6px',
  padding: '0.74rem 1rem',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.45rem',
};

const panelStyle = {
  border: '1px solid #eaddea',
  borderRadius: '8px',
  background: '#fff',
  boxShadow: '0 18px 45px rgba(55, 38, 57, 0.06)',
};

const parseSpecs = (text) => {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .reduce((specs, line) => {
      const [key, ...value] = line.split(':');
      if (key && value.length) specs[key.trim()] = value.join(':').trim();
      return specs;
    }, {});
};

const formatCurrency = (value) => `Rs.${Number(value || 0).toLocaleString('en-IN')}`;

export default function AdminDashboard() {
  const {
    adminAuthenticated,
    adminUsername,
    loginAdmin,
    logoutAdmin,
    updateAdminCredentials,
    addProduct,
    removeAdminProduct,
    adminProducts,
    updateAdminProduct,
    products,
  } = useStore();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [productForm, setProductForm] = useState(initialProductForm);
  const [productError, setProductError] = useState('');
  const [credentialForm, setCredentialForm] = useState({ username: adminUsername, password: '', confirmPassword: '' });
  const productCategories = useMemo(() => categories.map(cat => cat.name), []);

  const dashboardStats = useMemo(() => {
    const availableCount = products.filter(product => product.available).length;
    const bestsellerCount = products.filter(product => product.bestseller).length;
    const inventoryValue = products.reduce((total, product) => total + Number(product.price || 0), 0);
    const categoryMap = products.reduce((summary, product) => {
      summary[product.category] = (summary[product.category] || 0) + 1;
      return summary;
    }, {});
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

    return {
      availableCount,
      bestsellerCount,
      inventoryValue,
      topCategory: topCategory ? `${topCategory[0]} (${topCategory[1]})` : 'No products',
    };
  }, [products]);

  const recentProducts = useMemo(() => products.slice(0, 6), [products]);

  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', available: true, bestseller: false });

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setEditForm({ name: product.name, price: product.price, available: !!product.available, bestseller: !!product.bestseller });
  };

  const cancelEdit = () => { setEditingProductId(null); };

  const saveEdit = (productId) => {
    updateAdminProduct(productId, { name: String(editForm.name).trim(), price: Number(editForm.price), available: Boolean(editForm.available), bestseller: Boolean(editForm.bestseller) });
    setEditingProductId(null);
  };

  const categorySummary = useMemo(() => {
    return productCategories.map(category => {
      const count = products.filter(product => product.category === category).length;
      return { category, count };
    });
  }, [productCategories, products]);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError('');
    if (!loginAdmin(loginForm.username.trim(), loginForm.password)) {
      setLoginError('Invalid username or password.');
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    setProductError('');

    if (!productForm.name.trim() || !productForm.desc.trim() || !productForm.price) {
      setProductError('Name, price, and description are required.');
      return;
    }

    if (Number(productForm.price) <= 0) {
      setProductError('Price must be greater than zero.');
      return;
    }

    if (productForm.origPrice && Number(productForm.origPrice) <= Number(productForm.price)) {
      setProductError('Original price should be higher than selling price.');
      return;
    }

    addProduct({
      ...productForm,
      specs: parseSpecs(productForm.specsText),
    });
    setProductForm(initialProductForm);
  };

  const handleCredentialUpdate = (event) => {
    event.preventDefault();
    if (!credentialForm.username.trim() || !credentialForm.password) return;
    if (credentialForm.password !== credentialForm.confirmPassword) return;
    updateAdminCredentials(credentialForm.username, credentialForm.password);
    setCredentialForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  if (!adminAuthenticated) {
    return (
      <section style={{ minHeight: 'calc(100vh - 76px)', display: 'grid', placeItems: 'center', padding: '3rem 1.25rem', background: '#fbf7fb' }}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '430px', ...panelStyle, padding: '2rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '8px', background: '#f4e6f4', color: '#8b4294', display: 'grid', placeItems: 'center', marginBottom: '1rem' }}>
            <FiShield size={20} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: '#241626', marginBottom: '0.45rem' }}>Login</h1>
          <p style={{ color: '#746978', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Sign in to manage products, stock status, dashboard insights, and admin credentials.
          </p>

          <Field label="Username">
            <input style={fieldStyle} value={loginForm.username} onChange={e => setLoginForm(prev => ({ ...prev, username: e.target.value }))} autoComplete="username" />
          </Field>
          <Field label="Password" extraStyle={{ marginTop: '1rem' }}>
            <input style={fieldStyle} type="password" value={loginForm.password} onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))} autoComplete="current-password" />
          </Field>
          {loginError && <p style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: '1rem' }}>{loginError}</p>}

          <button type="submit" style={{ ...buttonStyle, width: '100%', background: '#8b4294', color: '#fff', marginTop: '1.25rem' }}>
            <FiLock size={15} /> Login
          </button>
          <p style={{ color: '#9b929d', fontSize: '0.78rem', marginTop: '1rem', lineHeight: 1.6 }}>
            Default login: admin / admin123
          </p>
        </form>
      </section>
    );
  }

  return (
    <section style={{ minHeight: 'calc(100vh - 76px)', padding: '2rem 1.5rem 4rem', background: '#fbf7fb' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#7b3d82', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <FiActivity size={14} /> Store Control Center
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.15rem)', fontWeight: 400, color: '#241626', lineHeight: 1 }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#746978', fontSize: '0.92rem', marginTop: '0.55rem' }}>
              Signed in as {adminUsername}. Manage your catalogue and keep the storefront updated.
            </p>
          </div>
          <button onClick={logoutAdmin} style={{ ...buttonStyle, background: '#fff', color: '#8b4294', border: '1px solid #eaddea' }}>
            <FiLogOut size={15} /> Logout
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem', marginBottom: '1.5rem' }} className="admin-stat-grid">
          <StatCard icon={<FiPackage />} label="Total Products" value={products.length} detail={`${adminProducts.length} admin added`} />
          <StatCard icon={<FiCheckCircle />} label="In Stock" value={dashboardStats.availableCount} detail={`${products.length - dashboardStats.availableCount} unavailable`} />
          <StatCard icon={<FiStar />} label="Bestsellers" value={dashboardStats.bestsellerCount} detail="Featured across store" />
          <StatCard icon={<FiTrendingUp />} label="Inventory Value" value={formatCurrency(dashboardStats.inventoryValue)} detail={dashboardStats.topCategory} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(300px, 0.75fr)', gap: '1.25rem', alignItems: 'start' }} className="admin-grid">
          <form onSubmit={handleAddProduct} style={{ ...panelStyle, padding: '1.35rem' }}>
            <SectionTitle icon={<FiBox />} title="Add Product" note="Create new catalogue items for the shop." />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }} className="form-grid">
              <Field label="Product Name"><input style={fieldStyle} value={productForm.name} onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))} /></Field>
              <Field label="Category">
                <select style={fieldStyle} value={productForm.category} onChange={e => setProductForm(prev => ({ ...prev, category: e.target.value }))}>
                  {productCategories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </Field>
              <Field label="Price"><input style={fieldStyle} type="number" min="1" value={productForm.price} onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))} /></Field>
              <Field label="Original Price"><input style={fieldStyle} type="number" min="1" value={productForm.origPrice} onChange={e => setProductForm(prev => ({ ...prev, origPrice: e.target.value }))} /></Field>
              <Field label="Fallback Symbol"><input style={fieldStyle} value={productForm.emoji} onChange={e => setProductForm(prev => ({ ...prev, emoji: e.target.value }))} /></Field>
              <Field label="Image URL"><input style={fieldStyle} value={productForm.imageUrl} onChange={e => setProductForm(prev => ({ ...prev, imageUrl: e.target.value }))} placeholder="https://..." /></Field>
            </div>

            <Field label="Description" extraStyle={{ marginTop: '1rem' }}>
              <textarea style={{ ...fieldStyle, minHeight: '112px', resize: 'vertical' }} value={productForm.desc} onChange={e => setProductForm(prev => ({ ...prev, desc: e.target.value }))} />
            </Field>

            <Field label="Specs" extraStyle={{ marginTop: '1rem' }}>
              <textarea style={{ ...fieldStyle, minHeight: '92px', resize: 'vertical' }} value={productForm.specsText} onChange={e => setProductForm(prev => ({ ...prev, specsText: e.target.value }))} placeholder={'Material: Brass\nWeight: 12g'} />
            </Field>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1.2rem' }}>
              <CheckField label="In stock" checked={productForm.available} onChange={checked => setProductForm(prev => ({ ...prev, available: checked }))} />
              <CheckField label="Best seller" checked={productForm.bestseller} onChange={checked => setProductForm(prev => ({ ...prev, bestseller: checked }))} />
            </div>

            {productError && <p style={{ color: '#dc2626', fontSize: '0.82rem', marginBottom: '1rem' }}>{productError}</p>}
            <button type="submit" style={{ ...buttonStyle, background: '#8b4294', color: '#fff' }}>
              <FiPlus size={15} /> Add Product
            </button>
          </form>

          <aside style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ ...panelStyle, padding: '1.25rem' }}>
              <SectionTitle icon={<FiGrid />} title="Category Mix" note="Products grouped by collection." />
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {categorySummary.map(item => (
                  <div key={item.category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.84rem', color: '#3a303d', marginBottom: '0.35rem' }}>
                      <span>{item.category}</span>
                      <strong>{item.count}</strong>
                    </div>
                    <div style={{ height: '7px', borderRadius: '3px', background: '#f0e8f1', overflow: 'hidden' }}>
                      <div style={{ width: `${products.length ? Math.max((item.count / products.length) * 100, 4) : 0}%`, height: '100%', background: '#8b4294' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCredentialUpdate} style={{ ...panelStyle, padding: '1.25rem' }}>
              <SectionTitle icon={<FiLock />} title="Admin Credentials" note="Update dashboard access." />
              <Field label="Username"><input style={fieldStyle} value={credentialForm.username} onChange={e => setCredentialForm(prev => ({ ...prev, username: e.target.value }))} /></Field>
              <Field label="New Password" extraStyle={{ marginTop: '1rem' }}><input style={fieldStyle} type="password" value={credentialForm.password} onChange={e => setCredentialForm(prev => ({ ...prev, password: e.target.value }))} /></Field>
              <Field label="Confirm Password" extraStyle={{ marginTop: '1rem' }}><input style={fieldStyle} type="password" value={credentialForm.confirmPassword} onChange={e => setCredentialForm(prev => ({ ...prev, confirmPassword: e.target.value }))} /></Field>
              {credentialForm.password && credentialForm.password !== credentialForm.confirmPassword && (
                <p style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: '0.75rem' }}>Passwords do not match.</p>
              )}
              <button type="submit" style={{ ...buttonStyle, width: '100%', background: '#241626', color: '#fff', marginTop: '1rem' }}>
                Save Credentials
              </button>
            </form>
          </aside>
        </div>

        <div style={{ ...panelStyle, marginTop: '1.25rem', padding: '1.25rem' }}>
          <SectionTitle icon={<FiImage />} title="Recent Products" note="Latest products shown first. Admin-added items can be removed." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.85rem' }} className="product-admin-grid">
            {recentProducts.map(product => (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '54px 1fr auto', gap: '0.75rem', alignItems: 'center', border: '1px solid #eee4ee', borderRadius: '8px', padding: '0.78rem', background: '#fff' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '6px', background: '#f6eef6', display: 'grid', placeItems: 'center', overflow: 'hidden', color: '#8b4294', fontWeight: 700 }}>
                  {product.imageUrl ? <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : product.emoji}
                </div>
                <div style={{ minWidth: 0 }}>
                  {editingProductId === product.id ? (
                    <div>
                      <input style={{ ...fieldStyle, marginBottom: '6px' }} value={editForm.name} onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="number" style={{ ...fieldStyle, width: '120px' }} value={editForm.price} onChange={e => setEditForm(prev => ({ ...prev, price: e.target.value }))} />
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <input type="checkbox" checked={editForm.available} onChange={e => setEditForm(prev => ({ ...prev, available: e.target.checked }))} /> Available
                        </label>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <input type="checkbox" checked={editForm.bestseller} onChange={e => setEditForm(prev => ({ ...prev, bestseller: e.target.checked }))} /> Bestseller
                        </label>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2d2430', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#746978', marginTop: '0.18rem' }}>{product.category} - {formatCurrency(product.price)}</div>
                      <div style={{ fontSize: '0.74rem', color: product.available ? '#15803d' : '#b91c1c', marginTop: '0.18rem' }}>{product.available ? 'In stock' : 'Unavailable'}</div>
                    </>
                  )}
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {product.addedByAdmin ? (
                    editingProductId === product.id ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => saveEdit(product.id)} style={{ ...buttonStyle, background: '#22c55e', color: '#fff' }}>Save</button>
                        <button onClick={cancelEdit} style={{ ...buttonStyle, background: '#ef4444', color: '#fff' }}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => startEdit(product)} style={{ ...buttonStyle, background: '#fff', color: '#8b4294', border: '1px solid #eaddea' }}><FiImage /> Edit</button>
                        <button onClick={() => removeAdminProduct(product.id)} style={{ background: '#fff5f5', color: '#dc2626', border: '1px solid #ffd8d8', borderRadius: '6px', cursor: 'pointer', padding: '0.5rem', display: 'grid', placeItems: 'center' }} title="Remove product">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    )
                  ) : (
                    <span style={{ color: '#a196a5', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Base</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .admin-stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .admin-grid { grid-template-columns: 1fr !important; }
          .product-admin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
          .admin-stat-grid,
          .form-grid,
          .product-admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SectionTitle({ icon, title, note }) {
  return (
    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: '#f4e6f4', color: '#8b4294', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 400, color: '#241626', lineHeight: 1.1 }}>{title}</h2>
        <p style={{ color: '#746978', fontSize: '0.82rem', marginTop: '0.25rem' }}>{note}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, detail }) {
  return (
    <div style={{ ...panelStyle, padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: '#746978', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
          <strong style={{ display: 'block', color: '#241626', fontSize: '1.55rem', lineHeight: 1.25, marginTop: '0.35rem', overflowWrap: 'anywhere' }}>{value}</strong>
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: '#f4e6f4', color: '#8b4294', flexShrink: 0 }}>
          {icon}
        </div>
      </div>
      <p style={{ color: '#8f8492', fontSize: '0.78rem', marginTop: '0.7rem' }}>{detail}</p>
    </div>
  );
}

function Field({ label, children, extraStyle }) {
  return (
    <div style={extraStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minHeight: '38px', border: '1px solid #eaddea', borderRadius: '6px', padding: '0.45rem 0.75rem', fontSize: '0.85rem', color: '#3a303d', background: '#fff' }}>
      <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />
      {label}
    </label>
  );
}
