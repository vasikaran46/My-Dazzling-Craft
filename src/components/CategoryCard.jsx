import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={() => navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
      style={{
        background: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '1.25rem 0.75rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -4,
        borderColor: '#b04a9f',
        boxShadow: '0 8px 30px rgba(176,74,159,0.18)',
      }}
    >
      <div style={{ width: '112px', height: '112px', margin: '0 auto 0.9rem', display: 'grid', placeItems: 'center', overflow: 'hidden', borderRadius: '8px', background: '#fff2f8' }}>
        {category.image ? (
          <img
            src={category.image}
            alt={`${category.name} jewelry`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span style={{ fontSize: '2.2rem', display: 'block' }}>{category.emoji}</span>
        )}
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#333', marginBottom: '0.2rem' }}>
        {category.name}
      </div>
      <div style={{ fontSize: '0.72rem', color: '#999' }}>
        {category.count} pieces
      </div>
    </motion.div>
  );
}
