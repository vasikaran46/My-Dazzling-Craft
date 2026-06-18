import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function BirthdayPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const canvasRef = useRef(null);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Confetti Animation Effect
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Confetti particles
    const colors = ['#D4AF37', '#FFF', '#1E3A8A', '#3B82F6', '#F59E0B', '#E5E7EB'];
    const particles = [];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height - 20,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        // Reset particle if it falls off screen
        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -20;
          p.tilt = Math.random() * 10 - 5;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(5, 12, 28, 0.75)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* Confetti Canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
          />

          {/* Floating Balloons Background (SVG) */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
            <div className="floating-balloon balloon-left" style={{ position: 'absolute', bottom: '-100px', left: '10%' }}>
              <svg width="60" height="90" viewBox="0 0 60 90">
                <defs>
                  <radialGradient id="gold-balloon" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="70%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8A640F" />
                  </radialGradient>
                </defs>
                <ellipse cx="30" cy="40" rx="25" ry="35" fill="url(#gold-balloon)" />
                <path d="M30 75 L28 85 L32 85 Z" fill="#8A640F" />
                <path d="M30 85 Q35 110 28 130" stroke="#8A640F" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="floating-balloon balloon-right" style={{ position: 'absolute', bottom: '-100px', right: '10%' }}>
              <svg width="70" height="100" viewBox="0 0 70 100">
                <defs>
                  <radialGradient id="blue-balloon" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="70%" stopColor="#1E3A8A" />
                    <stop offset="100%" stopColor="#0B132B" />
                  </radialGradient>
                </defs>
                <ellipse cx="35" cy="45" rx="30" ry="40" fill="url(#blue-balloon)" />
                <path d="M35 85 L33 92 L37 92 Z" fill="#0B132B" />
                <path d="M35 92 Q30 115 38 135" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'relative',
              width: '92%',
              maxWidth: '520px',
              background: 'linear-gradient(135deg, #0f2042 0%, #060e20 100%)',
              border: '2px solid #D4AF37',
              borderRadius: '20px',
              padding: '2.5rem 1.5rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
              zIndex: 3,
              overflow: 'hidden',
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255, 255, 255, 0.08)', border: 'none',
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#D4AF37', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
              aria-label="Close popup"
            >
              <FiX size={20} />
            </button>

            {/* Glowing sparkles in background */}
            <div className="sparkle twinkling" style={{ position: 'absolute', top: '20%', left: '12%', color: '#D4AF37' }}>✦</div>
            <div className="sparkle twinkling-delayed" style={{ position: 'absolute', top: '15%', right: '15%', color: '#D4AF37' }}>✦</div>
            <div className="sparkle twinkling" style={{ position: 'absolute', bottom: '25%', left: '15%', color: '#D4AF37' }}>✦</div>
            <div className="sparkle twinkling-delayed" style={{ position: 'absolute', bottom: '30%', right: '12%', color: '#D4AF37' }}>✦</div>

            {/* Header Content */}
            <span style={{
              display: 'inline-block', background: 'rgba(212, 175, 55, 0.12)',
              color: '#D4AF37', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.45rem 1.25rem', borderRadius: '30px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              marginBottom: '1.25rem',
            }}>
              Exclusive Celebration
            </span>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#FFF',
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: '0.75rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>
              🎉 Happy Birthday <span style={{ color: '#D4AF37', fontFamily: "inherit", fontWeight: 600 }}>My Life</span>! 🎂
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.6,
              maxWidth: '400px',
              margin: '0 auto 2rem',
            }}>
              Wishing you a wonderful year filled with happiness, success, and unforgettable moments.
            </p>

            {/* Birthday Cake Vector Illustration */}
            <div className="cake-wrapper" style={{ margin: '0 auto 2.25rem', width: '160px', height: '160px', position: 'relative' }}>
              {/* Radial glow background behind cake */}
              <div className="cake-glow" />

              <svg viewBox="0 0 160 160" width="100%" height="100%">
                {/* Plate */}
                <ellipse cx="80" cy="130" rx="50" ry="10" fill="#2A3C5E" stroke="#D4AF37" strokeWidth="2.5" />
                
                {/* Cake Tier 2 (Bottom) */}
                <rect x="42" y="90" width="76" height="32" rx="4" fill="#0D1F42" stroke="#D4AF37" strokeWidth="2" />
                <path d="M 42 98 Q 50 102 58 98 Q 66 102 74 98 Q 82 102 90 98 Q 98 102 106 98 Q 114 102 118 98 L 118 90 L 42 90 Z" fill="#D4AF37" opacity="0.85" />
                
                {/* Cake Tier 1 (Top) */}
                <rect x="52" y="58" width="56" height="32" rx="4" fill="#0D1F42" stroke="#D4AF37" strokeWidth="2" />
                <path d="M 52 66 Q 58 70 64 66 Q 70 70 76 66 Q 82 70 88 66 Q 94 70 100 66 Q 106 70 108 66 L 108 58 L 52 58 Z" fill="#D4AF37" opacity="0.85" />
                
                {/* Gold sprinkles on top tier */}
                <circle cx="62" cy="78" r="1.5" fill="#FFF" />
                <circle cx="70" cy="82" r="1.5" fill="#D4AF37" />
                <circle cx="80" cy="76" r="1.5" fill="#FFF" />
                <circle cx="90" cy="80" r="1.5" fill="#D4AF37" />
                <circle cx="98" cy="75" r="1.5" fill="#FFF" />

                {/* Candles */}
                {/* Candle 1 */}
                <rect x="64" y="38" width="4" height="20" rx="1" fill="#3B82F6" stroke="#D4AF37" strokeWidth="0.5" />
                <path className="candle-flame" d="M66 26 C68 28 68 33 66 36 C64 33 64 28 66 26 Z" fill="#FBBF24" />
                
                {/* Candle 2 (Center) */}
                <rect x="78" y="32" width="4" height="26" rx="1" fill="#EC4899" stroke="#D4AF37" strokeWidth="0.5" />
                <path className="candle-flame-delayed" d="M80 20 C82 22 82 27 80 30 C78 27 78 22 80 20 Z" fill="#FBBF24" />
                
                {/* Candle 3 */}
                <rect x="92" y="38" width="4" height="20" rx="1" fill="#10B981" stroke="#D4AF37" strokeWidth="0.5" />
                <path className="candle-flame" d="M94 26 C96 28 96 33 94 36 C92 33 92 28 94 26 Z" fill="#FBBF24" />
              </svg>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              style={{
                background: 'linear-gradient(90deg, #D4AF37 0%, #F3E5AB 50%, #D4AF37 100%)',
                color: '#0A1329',
                border: 'none',
                width: '100%',
                padding: '0.9rem 2rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.45)',
                transition: 'all 0.3s',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 25px rgba(212, 175, 55, 0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.45)'; }}
            >
              Celebrate Now
            </button>
          </motion.div>

          <style>{`
            /* Twinkling stars */
            @keyframes twinkling {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .twinkling {
              animation: twinkling 2.5s infinite ease-in-out;
            }
            .twinkling-delayed {
              animation: twinkling 2.5s infinite ease-in-out;
              animation-delay: 1.25s;
            }

            /* Floating Balloons */
            @keyframes float-up-left {
              0% { transform: translateY(0) rotate(0deg); opacity: 0; }
              10% { opacity: 0.85; }
              90% { opacity: 0.85; }
              100% { transform: translateY(-110vh) rotate(-12deg); opacity: 0; }
            }
            @keyframes float-up-right {
              0% { transform: translateY(0) rotate(0deg); opacity: 0; }
              10% { opacity: 0.85; }
              90% { opacity: 0.85; }
              100% { transform: translateY(-110vh) rotate(12deg); opacity: 0; }
            }
            .balloon-left {
              animation: float-up-left 14s infinite linear;
            }
            .balloon-right {
              animation: float-up-right 16s infinite linear;
              animation-delay: 4s;
            }

            /* Cake Glow */
            @keyframes radial-glow {
              0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.25; }
              50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.45; }
            }
            .cake-glow {
              position: absolute;
              top: 55%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 140px;
              height: 140px;
              background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
              border-radius: 50%;
              pointer-events: none;
              animation: radial-glow 3s infinite ease-in-out;
            }

            /* Candle Flame Animation */
            @keyframes flame-flicker {
              0%, 100% { transform: scale(1) rotate(0deg); }
              20% { transform: scale(0.9) rotate(-3deg); }
              40% { transform: scale(1.05) rotate(2deg); }
              60% { transform: scale(0.95) rotate(-1deg); }
              80% { transform: scale(1.05) rotate(3deg); }
            }
            .candle-flame {
              transform-origin: 66px 36px;
              animation: flame-flicker 1.8s infinite ease-in-out;
            }
            .candle-flame-delayed {
              transform-origin: 80px 30px;
              animation: flame-flicker 2.1s infinite ease-in-out;
              animation-delay: 0.5s;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
