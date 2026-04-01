import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'

function useCounter(target, inView, duration = 1800) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    if (target === '∞') { setCount('∞'); return }
    started.current = true

    const numTarget = parseInt(target.replace(/\D/g, ''), 10)
    const suffix = target.replace(/[\d]/g, '')
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numTarget)
      setCount(current + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return count
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCounter(stat.value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: 'center',
        padding: '40px 32px',
        background: 'var(--color-bg-card)',
        borderRadius: 20,
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: -30,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)',
      }} />
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2.4rem, 5vw, 3.2rem)',
        fontWeight: 800,
        background: 'var(--color-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {count || stat.value}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {a.label}
            </div>
            <h2 className="section-title">
              {a.title}<br />
              <span className="gradient-text">{a.titleAccent}</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 24 }}>{a.subtitle}</p>
            <p style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              maxWidth: 500,
            }}>
              {a.body}
            </p>

            {/* Tech stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {['React', 'Node.js', 'Python', 'n8n', 'AI/ML', 'AWS', 'Mobile', 'SaaS'].map(tech => (
                <span
                  key={tech}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 100,
                    background: 'var(--color-accent-soft)',
                    border: '1px solid var(--color-border)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}>
              {a.stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
