import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export default function Toast() {
  const { toast } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed', top: '80px', right: '24px', zIndex: 3000,
            background: '#170014', color: '#fff',
            padding: '0.75rem 1.25rem', borderRadius: '6px',
            fontSize: '0.85rem', maxWidth: '280px',
            borderLeft: '3px solid #b04a9f',
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
