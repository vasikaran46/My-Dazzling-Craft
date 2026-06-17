import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiInstagram, FiMessageCircle } from 'react-icons/fi';
import { openWhatsApp, INSTAGRAM, EMAIL } from '../utils/whatsapp';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill all fields.');
      return;
    }
    openWhatsApp(`Hello! I'm ${form.name} (${form.email}). Message: ${form.message}`);
    setStatus('Opening WhatsApp...');
  };

  return (
    <div>
      {/* Hero */}
      <div className="contact-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ display: 'inline-block', background: '#f5c7df', color: '#7f246f', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            Get in Touch
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#170014', lineHeight: 1.2 }}>
            Contact <em style={{ color: '#b04a9f' }}>Us</em>
          </h1>
          <p style={{ color: '#777', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Have questions about our jewelry? We'd love to hear from you.
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: '#170014', marginBottom: '1.5rem' }}>
              Reach Out Directly
            </h2>
            <p style={{ color: '#777', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '2rem' }}>
              For the fastest response, reach out via WhatsApp or email. We're here to help with orders, customizations, and any questions.
            </p>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f5c7df', color: '#7f246f', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <FiMail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Email</div>
                  <div style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>{EMAIL}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f5c7df', color: '#7f246f', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <FiInstagram size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Instagram</div>
                  <div style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>{INSTAGRAM}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f5c7df', color: '#7f246f', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <FiMapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Location</div>
                  <div style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>India (Online Only)</div>
                </div>
              </div>
              <button
                onClick={() => openWhatsApp('Hello! I have a question about your jewelry.')}
                className="contact-btn-wa"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#25D366', color: '#fff', border: 'none',
                  padding: '0.8rem 1.5rem', borderRadius: '2px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                  fontWeight: 500, cursor: 'pointer', marginTop: '0.5rem',
                }}
              >
                <FiMessageCircle size={18} /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: '#170014', marginBottom: '1.5rem' }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#555', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #e7b9d4', borderRadius: '4px', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#555', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #e7b9d4', borderRadius: '4px', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#555', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #e7b9d4', borderRadius: '4px', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", minHeight: '120px', resize: 'vertical', outline: 'none' }}
                  placeholder="How can we help you today?"
                />
              </div>
              {status && <p style={{ color: '#7f246f', fontSize: '0.85rem' }}>{status}</p>}
              <button
                type="submit"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  background: '#b04a9f', color: '#fff', border: 'none',
                  padding: '0.85rem 1.5rem', borderRadius: '2px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem',
                  fontWeight: 500, cursor: 'pointer',
                }}
              >
                <FiSend size={16} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#170014', textAlign: 'center', marginBottom: '2.5rem' }}>
            Frequently Asked <em style={{ color: '#b04a9f' }}>Questions</em>
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { q: 'How do I place an order?', a: 'Browse our collection, add items to cart, and checkout via WhatsApp. We\'ll confirm availability and guide you through payment.' },
              { q: 'What is your return policy?', a: 'We offer easy 7-day returns. If you\'re not satisfied, contact us within 7 days of receiving your order.' },
              { q: 'Do you offer customizations?', a: 'Yes! Many of our jewelry pieces can be customized. Use the WhatsApp enquiry button to discuss your ideas.' },
              { q: 'How long does shipping take?', a: 'Orders are typically dispatched within 2-3 business days. Delivery takes 3-5 days depending on your location.' },
              { q: 'Is delivery free?', a: 'Delivery is free on all orders above ₹999. For orders under ₹999, standard shipping rates apply.' },
            ].map((item, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e7b9d4', borderRadius: '6px', padding: '1rem 1.25rem' }}>
                <summary style={{ fontWeight: 500, color: '#333', cursor: 'pointer', fontSize: '0.95rem' }}>{item.q}</summary>
                <p style={{ color: '#777', marginTop: '0.75rem', lineHeight: 1.7, fontSize: '0.88rem' }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero {
          background: rgb(245, 199, 223);
          padding: 5rem 2rem;
          textAlign: center;
        }
        .contact-section {
          padding: 5rem 2rem;
          background: #fff;
        }
        .contact-grid {
          maxWidth: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 4rem;
        }
        .faq-section {
          padding: 4rem 2rem;
          background: #fff2f8;
        }
        
        @media (max-width: 768px) {
          .contact-hero {
            padding: 3rem 1.25rem !important;
          }
          .contact-section {
            padding: 3rem 1.25rem !important;
          }
          .contact-grid {
            gap: 2.5rem !important;
          }
          .faq-section {
            padding: 3rem 1.25rem !important;
          }
          .contact-btn-wa {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
