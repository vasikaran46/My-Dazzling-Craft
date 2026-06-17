import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShare2, FiHeart, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useStore } from '../hooks/useStore';
import { enquireAboutProduct, shareProduct, copyToClipboard } from '../utils/whatsapp';

const isImageSrc = (value) => typeof value === 'string' && (/^https?:\/\//.test(value) || value.startsWith('data:image/') || value.startsWith('/'));

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleWishlist, isWishlisted, addToRecentlyViewed, showToast, addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem' }}>Product Not Found</h2>
        <button onClick={() => navigate('/shop')} style={{ background: '#b04a9f', color: '#fff', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '2px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif" }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = isWishlisted(product.id);
  const discount = product.origPrice ? Math.round((1 - product.price / product.origPrice) * 100) : null;
  const images = product.images || [product.emoji, '💫', '✦'];

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.desc, url });
    } else {
      copyToClipboard(url);
      showToast('Link copied to clipboard! 🔗');
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#aaa' }}>
          <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/shop" style={{ color: '#aaa', textDecoration: 'none' }}>Shop</Link>
          <span>›</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: '#aaa', textDecoration: 'none' }}>{product.category}</Link>
          <span>›</span>
          <span style={{ color: '#b04a9f' }}>{product.name}</span>
        </nav>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', color: '#777', fontSize: '0.85rem', marginTop: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}
        >
          <FiArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Main Detail */}
      <div className="product-details-container">

        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div style={{
            width: '100%', aspectRatio: '1',
            background: 'linear-gradient(135deg, #fff2f8, #f8d7e8)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '7rem', border: '1px solid #e7b9d4', marginBottom: '0.75rem',
            overflow: 'hidden',
          }}>
            {isImageSrc(images[activeImage]) ? (
              <img src={images[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : images[activeImage]}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                style={{
                  width: '72px', height: '72px',
                  background: 'linear-gradient(135deg, #fff2f8, #f8d7e8)',
                  borderRadius: '4px',
                  border: `2px solid ${activeImage === i ? '#b04a9f' : 'transparent'}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', transition: 'border-color 0.2s', overflow: 'hidden',
                }}
              >
                {isImageSrc(img) ? (
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : img}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontSize: '0.72rem', color: '#b04a9f', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {product.category}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, lineHeight: 1.2, color: '#170014', marginBottom: '0.75rem' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 500, color: '#7f246f' }}>
              ₹{product.price.toLocaleString()}
            </span>
            {product.origPrice && (
              <>
                <span style={{ fontSize: '1rem', color: '#aaa', textDecoration: 'line-through', fontWeight: 300 }}>
                  ₹{product.origPrice.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.82rem', background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '2px', fontWeight: 500 }}>
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Availability */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 500, color: product.available ? '#16a34a' : '#dc2626', marginBottom: '1.25rem' }}>
            <span style={{ width: '7px', height: '7px', background: product.available ? '#16a34a' : '#dc2626', borderRadius: '50%', flexShrink: 0 }} />
            {product.available ? 'In Stock' : 'Out of Stock'}
          </div>

          <p style={{ fontSize: '0.92rem', color: '#777', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            {product.desc}
          </p>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div style={{ border: '1px solid #e7b9d4', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', borderBottom: '1px solid #e7b9d4', fontSize: '0.85rem' }}>
                  <div style={{ background: '#fff2f8', padding: '0.6rem 0.9rem', width: '140px', flexShrink: 0, fontWeight: 500, color: '#333' }}>
                    {key}
                  </div>
                  <div style={{ padding: '0.6rem 0.9rem', color: '#777' }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="quantity-cart-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #e7b9d4', borderRadius: '2px', overflow: 'hidden' }}>
              <button
                onClick={() => setQuantity(qty => Math.max(1, qty - 1))}
                style={{ width: '38px', height: '38px', border: 'none', background: '#fff', color: '#777', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span style={{ minWidth: '42px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(qty => qty + 1)}
                style={{ width: '38px', height: '38px', border: 'none', background: '#fff', color: '#777', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
            <button
              disabled={!product.available}
              onClick={() => addToCart(product, quantity)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: product.available ? '#b04a9f' : '#ddd',
                color: '#fff', border: 'none',
                padding: '0.8rem 1.5rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                fontWeight: 600, cursor: product.available ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                justifyContent: 'center',
              }}
              onMouseEnter={e => { if (product.available) { e.currentTarget.style.background = '#7f246f'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { if (product.available) { e.currentTarget.style.background = '#b04a9f'; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
              <FiShoppingBag size={15} /> {product.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className="action-buttons-wrapper" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => enquireAboutProduct(product)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff', border: 'none',
                padding: '0.8rem 1.5rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1da851'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaWhatsapp size={16} style={{ marginRight: '6px' }} /> Enquire on WhatsApp
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: '#333', border: '1.5px solid #e7b9d4',
                padding: '0.8rem 1.25rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#b04a9f'; e.currentTarget.style.color = '#b04a9f'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e7b9d4'; e.currentTarget.style.color = '#333'; }}
            >
              <FiShare2 size={15} /> Share
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: wished ? '#fff2f8' : 'transparent',
                color: wished ? '#b04a9f' : '#333',
                border: `1.5px solid ${wished ? '#b04a9f' : '#e7b9d4'}`,
                padding: '0.8rem 1rem', borderRadius: '2px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <FiHeart size={15} fill={wished ? '#b04a9f' : 'none'} />
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          {/* Delivery note */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff2f8', borderRadius: '6px', border: '1px solid #f5c7df', fontSize: '0.82rem', color: '#777' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span>📦</span> <span>Free delivery on orders above ₹999</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span>🔄</span> <span>Easy 7-day returns</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span>🎁</span> <span>Complimentary gift packaging available</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, marginBottom: '1.5rem' }}>
            You May Also <em style={{ color: '#b04a9f' }}>Like</em>
          </h3>
          <div className="related-products-grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      <style>{`
        .product-details-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        .related-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .product-details-container {
            padding: 1.25rem !important;
            gap: 1.5rem !important;
          }
          .action-buttons-wrapper {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          .action-buttons-wrapper > button {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.75rem 1rem !important;
          }
          .quantity-cart-wrapper {
            width: 100% !important;
          }
          .quantity-cart-wrapper > button {
            flex: 1 !important;
          }
        }
        
        @media (max-width: 640px) {
          .related-products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}
