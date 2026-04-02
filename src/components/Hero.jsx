import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useLang } from '../context/LangContext'
import logo from '../assets/CodeiqueLogo.png'


export default function Hero() {
  const { t } = useLang()
  const containerRef = useRef(null)

  const codeControls = useAnimation()
  const uniqueControls = useAnimation()
  const flashControls = useAnimation()
  const logoControls = useAnimation()
  const textControls = useAnimation()
  const revealControls = useAnimation()

  useEffect(() => {
    async function runAnimation() {
      // Phase 1: words enter from sides (0 → 0.8s)
      await Promise.all([
        codeControls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
        uniqueControls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
      ])

      // Phase 2: collide — move toward each other (0.8 → 1.4s)
      await Promise.all([
        codeControls.start({ x: '38vw', scale: 0.85, transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] } }),
        uniqueControls.start({ x: '-38vw', scale: 0.85, transition: { duration: 0.55, ease: [0.55, 0, 1, 0.45] } }),
      ])

      // Phase 3: flash (1.4 → 2.0s)
      await Promise.all([
        codeControls.start({ opacity: 0, scale: 0.4, transition: { duration: 0.3, ease: 'easeIn' } }),
        uniqueControls.start({ opacity: 0, scale: 0.4, transition: { duration: 0.3, ease: 'easeIn' } }),
        flashControls.start({
          opacity: [0, 1, 0],
          scale: [0.5, 1.8, 0.5],
          transition: { duration: 0.6, ease: 'easeOut' },
        }),
      ])

      // Phase 4: logo appears (2.0 → 2.8s)
      await Promise.all([
        logoControls.start({ opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
        textControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }),
      ])

      // Phase 5: tagline reveals (2.8 → 3.5s)
      await revealControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } })
    }

    // Small delay before start
    const t = setTimeout(runAnimation, 400)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const wordStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(3rem, 10vw, 7rem)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    userSelect: 'none',
    willChange: 'transform',
  }

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 80px',
        zIndex: 1,
      }}
    >
      {/* Radial glow behind animation */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Animation stage */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: 180,
          marginBottom: 24,
        }}
      >
        {/* CODE word */}
        <motion.div
          initial={{ x: '-45vw', opacity: 0 }}
          animate={codeControls}
          style={{
            position: 'absolute',
            ...wordStyle,
            background: 'linear-gradient(135deg, #4F8EF7 0%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          code
        </motion.div>

        {/* UNIQUE word */}
        <motion.div
          initial={{ x: '45vw', opacity: 0 }}
          animate={uniqueControls}
          style={{
            position: 'absolute',
            ...wordStyle,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          unique
        </motion.div>

        {/* Collision flash / ripple */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={flashControls}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(79,142,247,0.4) 40%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Logo (appears after flash) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={logoControls}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            zIndex: 3,
          }}
        >
          <div style={{ position: 'relative' }}>
            {/* Glow ring behind logo */}
            <div style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,142,247,0.2) 0%, transparent 70%)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }} />
            <img
              src={logo}
              alt="Codeique"
              style={{ width: 'clamp(80px, 12vw, 120px)', height: 'auto', position: 'relative', zIndex: 1 }}
            />
          </div>

          {/* Company name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={textControls}
          >
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
            }}>
              Codeique
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Tagline + CTA — revealed last */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={revealControls}
        style={{ textAlign: 'center', maxWidth: 640, zIndex: 1 }}
      >
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: 12,
          fontWeight: 400,
        }}>
          {t.hero.tagline}
        </p>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.02em',
          marginBottom: 40,
        }}>
          {t.hero.sub}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a
            href="#systems"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>scroll</span>
        <div style={{
          width: 24,
          height: 36,
          border: '1.5px solid var(--color-border-hover)',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 6,
        }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 4, height: 8, borderRadius: 2, background: 'var(--color-accent)' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
