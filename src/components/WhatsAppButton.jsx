import { motion } from 'framer-motion';
import { openWhatsApp } from '../utils/whatsapp';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      onClick={() => openWhatsApp('Hello! I visited your website and would like to know more.')}
      title="Chat on WhatsApp"
      className="wa-pulse"
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
        background: '#25D366', color: '#fff', border: 'none',
        width: '56px', height: '56px', borderRadius: '50%',
        fontSize: '1.6rem', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} />
    </motion.button>
  );
}
