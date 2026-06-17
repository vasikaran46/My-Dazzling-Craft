import { motion } from 'framer-motion';

export default function Testimonials({ reviews }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
    }}>
      {reviews.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{
            background: '#fff', border: '1px solid #e7b9d4',
            borderRadius: '8px', padding: '1.5rem', position: 'relative',
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem', color: '#f5c7df',
            position: 'absolute', top: '-10px', left: '1rem', lineHeight: 1,
          }}>❝</div>

          <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '0.75rem', marginTop: '1rem' }}>
            {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
          </div>

          <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.7, marginBottom: '1rem' }}>
            {t.text}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', background: '#f5c7df', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.85rem', fontWeight: 500, color: '#7f246f', flexShrink: 0,
            }}>
              {t.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>{t.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{t.location}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
