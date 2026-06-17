import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useStore } from '../hooks/useStore';
import { enquireAboutProduct } from '../utils/whatsapp';

const isImageSrc = (value) => typeof value === 'string' && (/^https?:\/\//.test(value) || value.startsWith('data:image/') || value.startsWith('/'));

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted, addToCart, adminAuthenticated, updateAdminProduct, removeAdminProduct, showToast } = useStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const wished = isWishlisted(product.id);
  const discount = product.origPrice
    ? Math.round((1 - product.price / product.origPrice) * 100)
    : null;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: product.name, price: product.price, available: !!product.available });

  const startEdit = (e) => { e.stopPropagation(); setForm({ name: product.name, price: product.price, available: !!product.available }); setEditing(true); };
  const cancelEdit = (e) => { e && e.stopPropagation(); setEditing(false); };
  const saveEdit = (e) => {
    e.stopPropagation();
    if (!product.addedByAdmin) {
      showToast('Only admin-added products can be edited');
      setEditing(false);
      return;
    }
    updateAdminProduct(product.id, { name: String(form.name).trim(), price: Number(form.price), available: Boolean(form.available) });
    setEditing(false);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    if (!product.addedByAdmin) { showToast('Only admin-added products can be removed'); return; }
    if (confirm('Remove this product from admin list?')) removeAdminProduct(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        background: '#fff',
        border: '1px solid #e7b9d4',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s',
      }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(176,74,159,0.18)' }}
      onClick={() => { if (!editing) navigate(`/product/${product.id}`); }}
    >
      {/* Badge */}
      {product.bestseller && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: '#b04a9f', color: '#fff',
          fontSize: '0.65rem', fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '0.25rem 0.6rem', borderRadius: '2px', zIndex: 1,
        }}>
          Best Seller
        </div>
      )}
      {!product.available && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: '#666', color: '#fff',
          fontSize: '0.65rem', fontWeight: 500,
          padding: '0.25rem 0.6rem', borderRadius: '2px', zIndex: 1,
        }}>
          Out of Stock
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
        style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 1,
          background: '#fff', border: 'none',
          width: '32px', height: '32px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          color: wished ? '#b04a9f' : '#aaa',
        }}
      >
        <FiHeart size={15} fill={wished ? '#b04a9f' : 'none'} />
      </button>

      {adminAuthenticated && isAdminRoute && (
        <div style={{ position: 'absolute', top: '12px', right: '56px', display: 'flex', gap: '8px', zIndex: 2 }}>
          {!editing ? (
            <>
              <button
                onClick={startEdit}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}
                title="Edit"
              >
                <FiEdit2 size={14} />
              </button>
              <button
                onClick={handleDelete}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}
                title="Remove"
              >
                <FiTrash2 size={14} />
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={saveEdit} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
              <button onClick={cancelEdit} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {/* Image */}
      <div style={{
        width: '100%', height: '220px',
        background: 'linear-gradient(135deg, #fff2f8, #f8d7e8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '4rem', overflow: 'hidden',
      }}>
        {product.imageUrl && isImageSrc(product.imageUrl) ? (
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block' }}
          >
            {product.emoji}
          </motion.span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1rem 1.25rem' }} className="product-info-section">
        <div style={{ fontSize: '0.68rem', color: '#b04a9f', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          {product.category}
        </div>
        <div className="product-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {editing ? (
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', fontSize: '1rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid #e7b9d4' }}
            />
          ) : (
            product.name
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1rem', fontWeight: 500, color: '#7f246f' }}>
            {editing ? (
              <input
                type="number"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                onClick={e => e.stopPropagation()}
                style={{ width: '100px', fontSize: '1rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid #e7b9d4' }}
              />
            ) : (
              `₹${product.price.toLocaleString()}`
            )}
          </span>
          {product.origPrice && (
            <>
              <span style={{ fontSize: '0.8rem', color: '#aaa', textDecoration: 'line-through' }}>
                ₹{product.origPrice.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#16a34a', padding: '0.15rem 0.4rem', borderRadius: '2px', fontWeight: 500 }}>
                {discount}% OFF
              </span>
            </>
          )}
          {editing && (
            <label style={{ display: 'block', marginTop: '8px', fontSize: '0.85rem', color: '#555' }}>
              <input type="checkbox" checked={!!form.available} onChange={e => setForm(f => ({ ...f, available: e.target.checked }))} onClick={e => e.stopPropagation()} style={{ marginRight: '8px' }} /> Available
            </label>
          )}
        </div>

        <button
          disabled={!product.available}
          onClick={e => { e.stopPropagation(); addToCart(product); }}
          className="product-btn-main"
          style={{
            width: '100%', padding: '0.55rem', fontSize: '0.72rem',
            borderRadius: '2px', letterSpacing: '0.04em', textTransform: 'uppercase',
            fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            cursor: product.available ? 'pointer' : 'not-allowed',
            background: product.available ? '#b04a9f' : '#ddd',
            color: '#fff', border: 'none', transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
            marginBottom: '0.5rem',
          }}
          onMouseEnter={e => { if (product.available) e.currentTarget.style.background = '#7f246f'; }}
          onMouseLeave={e => { if (product.available) e.currentTarget.style.background = '#b04a9f'; }}
        >
          <FiShoppingBag size={14} /> {product.available ? 'Add to Cart' : 'Out of Stock'}
        </button>

        <div className="product-actions-container" style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className="product-btn-secondary"
            style={{
              flex: 1, padding: '0.45rem', fontSize: '0.72rem',
              borderRadius: '2px', letterSpacing: '0.04em', textTransform: 'uppercase',
              fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              background: '#b04a9f', color: '#fff', border: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#7f246f'}
            onMouseLeave={e => e.currentTarget.style.background = '#b04a9f'}
          >
            Details
          </button>
          <button
            onClick={e => { e.stopPropagation(); enquireAboutProduct(product); }}
            className="product-btn-secondary"
            style={{
              flex: 1, padding: '0.45rem', fontSize: '0.72rem',
              borderRadius: '2px', letterSpacing: '0.04em', textTransform: 'uppercase',
              fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              background: 'transparent', color: '#25D366', border: '1.5px solid #25D366',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#25D366'; }}
          >
            <FaWhatsapp size={14} style={{ marginRight: '4px' }} /> WA
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .product-info-section {
            padding: 0.65rem 0.65rem 0.85rem !important;
          }
          .product-title {
            font-size: 0.95rem !important;
            margin-bottom: 0.35rem !important;
          }
          .product-btn-main {
            padding: 0.45rem !important;
            font-size: 0.65rem !important;
            margin-bottom: 0.35rem !important;
          }
          .product-actions-container {
            flex-direction: column !important;
            gap: 0.35rem !important;
          }
          .product-btn-secondary {
            padding: 0.45rem 0.25rem !important;
            font-size: 0.65rem !important;
            width: 100% !important;
            flex: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
