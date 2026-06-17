import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useStore } from '../hooks/useStore';
import { enquireAboutCart } from '../utils/whatsapp';

const isImageSrc = (value) => typeof value === 'string' && (/^https?:\/\//.test(value) || value.startsWith('data:image/') || value.startsWith('/'));

const buttonStyle = {
  border: 'none',
  borderRadius: '2px',
  padding: '0.75rem 1.15rem',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.82rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.45rem',
};

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const deliveryText = cartTotal >= 999 ? 'Free delivery eligible' : `Add Rs.${(999 - cartTotal).toLocaleString()} more for free delivery`;

  if (cartItems.length === 0) {
    return (
      <section style={{ minHeight: 'calc(100vh - 76px)', padding: '5rem 2rem', display: 'grid', placeItems: 'center', background: '#fff' }}>
        <div style={{ textAlign: 'center', maxWidth: '460px' }}>
          <div style={{ width: '78px', height: '78px', borderRadius: '50%', background: '#fff2f8', color: '#b04a9f', display: 'grid', placeItems: 'center', margin: '0 auto 1.25rem' }}>
            <FiShoppingBag size={32} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.35rem', fontWeight: 300, color: '#170014', marginBottom: '0.6rem' }}>Your Cart Is Empty</h1>
          <p style={{ color: '#777', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Add your favorite handmade jewelry pieces and checkout through WhatsApp.
          </p>
          <button onClick={() => navigate('/shop')} style={{ ...buttonStyle, background: '#b04a9f', color: '#fff' }}>
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '3.25rem 2rem 5rem', background: '#fff' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/shop')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', cursor: 'pointer', color: '#777', fontSize: '0.85rem', marginBottom: '1.2rem', fontFamily: "'DM Sans', sans-serif" }}
        >
          <FiArrowLeft size={14} /> Continue Shopping
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#170014' }}>
              Shopping <em style={{ color: '#b04a9f' }}>Cart</em>
            </h1>
            <p style={{ color: '#777', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              {cartCount} item{cartCount === 1 ? '' : 's'} ready for WhatsApp checkout.
            </p>
          </div>
          <button onClick={clearCart} style={{ ...buttonStyle, background: '#fff5f5', color: '#dc2626', border: '1px solid #ffd8d8' }}>
            <FiTrash2 size={15} /> Clear Cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '1.5rem', alignItems: 'start' }} className="cart-grid">
          <div style={{ display: 'grid', gap: '1rem' }}>
            {cartItems.map(item => {
              const firstImage = item.imageUrl || item.images?.[0];
              return (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: '1rem', alignItems: 'center', border: '1px solid #e7b9d4', borderRadius: '8px', padding: '0.9rem', background: '#fff' }} className="cart-item">
                  <div style={{ width: '96px', height: '96px', background: 'linear-gradient(135deg, #fff2f8, #f8d7e8)', borderRadius: '6px', display: 'grid', placeItems: 'center', overflow: 'hidden', fontSize: '2.5rem', color: '#b04a9f' }}>
                    {isImageSrc(firstImage) ? (
                      <img src={firstImage} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : item.emoji}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: '#b04a9f', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.category}</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 300, color: '#170014', lineHeight: 1.2, marginBottom: '0.45rem' }}>{item.name}</h2>
                    <p style={{ color: '#7f246f', fontWeight: 600, fontSize: '0.95rem' }}>Rs.{item.price.toLocaleString()}</p>
                  </div>

                  <div style={{ display: 'grid', justifyItems: 'end', gap: '0.65rem' }} className="cart-actions">
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #e7b9d4', borderRadius: '2px', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        style={{ width: '34px', height: '34px', border: 'none', background: '#fff', color: '#777', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <FiMinus size={13} />
                      </button>
                      <span style={{ minWidth: '38px', textAlign: 'center', fontSize: '0.86rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        style={{ width: '34px', height: '34px', border: 'none', background: '#fff', color: '#777', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <FiPlus size={13} />
                      </button>
                    </div>
                    <strong style={{ color: '#170014', fontSize: '0.95rem' }}>Rs.{(item.price * item.quantity).toLocaleString()}</strong>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem' }}>
                      <FiTrash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <aside style={{ border: '1px solid #e7b9d4', borderRadius: '8px', padding: '1.25rem', background: '#fff2f8', position: 'sticky', top: '96px' }} className="cart-summary">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#170014', marginBottom: '1rem' }}>Order Summary</h2>
            <SummaryRow label="Items" value={cartCount} />
            <SummaryRow label="Subtotal" value={`Rs.${cartTotal.toLocaleString()}`} />
            <SummaryRow label="Delivery" value={deliveryText} />
            <div style={{ height: '1px', background: '#e7b9d4', margin: '1rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span style={{ color: '#333', fontWeight: 600 }}>Total</span>
              <strong style={{ color: '#7f246f', fontSize: '1.35rem' }}>Rs.{cartTotal.toLocaleString()}</strong>
            </div>
            <button onClick={() => enquireAboutCart(cartItems, cartTotal)} style={{ ...buttonStyle, width: '100%', background: '#25D366', color: '#fff' }}>
              Checkout on WhatsApp
            </button>
            <p style={{ color: '#777', fontSize: '0.78rem', lineHeight: 1.7, marginTop: '0.9rem' }}>
              Final availability, delivery, and payment details will be confirmed on WhatsApp.
            </p>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
          .cart-summary { position: static !important; }
        }
        @media (max-width: 620px) {
          .cart-item { grid-template-columns: 76px 1fr !important; }
          .cart-actions { grid-column: 1 / -1; justify-items: stretch !important; }
        }
      `}</style>
    </section>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', color: '#777', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
      <span>{label}</span>
      <span style={{ color: '#333', textAlign: 'right' }}>{value}</span>
    </div>
  );
}
