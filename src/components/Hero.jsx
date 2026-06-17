import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroVideo from '../../assets/video/hero.mp4';

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -90]);

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0, x: 120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(135deg, #fff2f8 0%, #f8d7e8 40%, #f5c7df 100%)',
        minHeight: 'min(720px, calc(100vh - 70px))',
        display: 'grid', gridTemplateColumns: 'minmax(320px, 0.82fr) minmax(0, 1.18fr)', alignItems: 'stretch',
        position: 'relative', overflow: 'hidden',
        padding: 0,
      }}
      className="hero-section"
    >
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{ gridColumn: 1, position: 'relative', zIndex: 0, minHeight: 'inherit', overflow: 'hidden' }}
        className="hero-video-panel"
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', transform: 'translateZ(0)' }}
        />
      </motion.div>

      <motion.div style={{ x: contentX, gridColumn: 2, position: 'relative', zIndex: 2, width: '100%', maxWidth: '700px', alignSelf: 'center', justifySelf: 'start', padding: '4.5rem clamp(1.25rem, 3vw, 3rem)', boxSizing: 'border-box' }} className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            display: 'inline-block', background: '#f5c7df', color: '#7f246f',
            fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '0.42rem 1rem', borderRadius: '2px', marginBottom: '1.6rem',
          }}>
            Handcrafted with Love
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem, 4.7vw, 4.4rem)',
            fontWeight: 300, lineHeight: 1.06, color: '#170014', marginBottom: '1.5rem',
            maxWidth: '100%', overflowWrap: 'normal',
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            Handcrafted <em style={{ color: '#b04a9f' }}>Elegance</em>
          </span>
          <br />for Every Occasion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '1rem', color: '#777', lineHeight: 1.7, marginBottom: '2.25rem', maxWidth: '520px' }}
        >
          Each piece tells a story, delicately crafted by hand, designed to shimmer and sparkle, made to be treasured forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => navigate('/shop')}
            style={{
              background: '#b04a9f', color: '#fff', border: 'none',
              padding: '0.95rem 2.25rem', borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
              fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#7f246f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#b04a9f'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate('/categories')}
            style={{
              background: 'transparent', color: '#b04a9f', border: '1.5px solid #b04a9f',
              padding: '0.95rem 2.25rem', borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
              fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b04a9f'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b04a9f'; }}
          >
            Explore Collections
          </button>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 720px) {
          .hero-section {
            display: grid !important;
            grid-template-columns: 1fr !important;
            min-height: calc(100vh - 70px) !important;
          }
          .hero-video-panel {
            grid-column: 1 !important;
            min-height: 42vh !important;
          }
          .hero-video-panel video {
            height: 100% !important;
          }
          .hero-content {
            grid-column: 1 !important;
            padding: 4rem 1.25rem !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
