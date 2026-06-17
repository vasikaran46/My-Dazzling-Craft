import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';
import { useStore } from '../hooks/useStore';

export default function Categories() {
  const navigate = useNavigate();
  const { products } = useStore();
  const [selected, setSelected] = useState(null);

  const handleCategoryClick = (cat) => {
    if (selected?.id === cat.id) {
      setSelected(null);
    } else {
      setSelected(cat);
      setTimeout(() => {
        document.getElementById('cat-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const selectedProducts = selected ? products.filter(p => p.category === selected.name) : [];

  return (
    <section style={{ padding: '4rem 2rem 5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#170014' }}>
            Our <em style={{ color: '#b04a9f' }}>Collections</em>
          </h1>
        </div>
        <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem', marginBottom: '3rem' }}>
          Browse by category — find your perfect piece
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {categories.map((cat, i) => {
            const isSelected = selected?.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  background: isSelected ? '#fff2f8' : '#fff',
                  border: `1.5px solid ${isSelected ? '#b04a9f' : '#e7b9d4'}`,
                  borderRadius: '8px', padding: '2rem 1.5rem',
                  textAlign: 'center', cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(176,74,159,0.18)' }}
              >
                <div style={{ width: '104px', height: '104px', margin: '0 auto 0.9rem', display: 'grid', placeItems: 'center', overflow: 'hidden', borderRadius: '8px', background: '#fff2f8' }}>
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={`${cat.name} jewelry`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <span style={{ fontSize: '2.8rem', display: 'block' }}>{cat.emoji}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: isSelected ? '#b04a9f' : '#333', marginBottom: '0.25rem' }}>{cat.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '1rem' }}>{cat.count} pieces</div>
                <div style={{ fontSize: '0.78rem', color: '#b04a9f', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {isSelected ? '▲ Close' : 'View All →'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Products for selected category */}
        <AnimatePresence>
          {selected && (
            <motion.div
              id="cat-products"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#170014' }}>
                    {selected.image && (
                      <img
                        src={selected.image}
                        alt=""
                        style={{ width: '34px', height: '34px', objectFit: 'cover', verticalAlign: 'middle', marginRight: '0.45rem', borderRadius: '4px' }}
                      />
                    )}
                    {!selected.image && selected.emoji} <em style={{ color: '#b04a9f' }}>{selected.name}</em>
                    <span style={{ fontSize: '1rem', color: '#aaa', fontStyle: 'normal', marginLeft: '0.75rem' }}>({selectedProducts.length} items)</span>
                  </h3>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => navigate(`/shop?category=${encodeURIComponent(selected.name)}`)}
                      style={{ background: '#b04a9f', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '2px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Shop All →
                    </button>
                    <button
                      onClick={() => setSelected(null)}
                      style={{ background: 'transparent', border: '1.5px solid #e7b9d4', padding: '0.5rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem', color: '#777', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                  {selectedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
