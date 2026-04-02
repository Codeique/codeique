import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

export default function ContactSection() {
  const { t } = useLang()
  const c = t.contact

  return (
    <section id="contact" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto',
            padding: '60px 32px',
            background: 'var(--color-bg-card)',
            borderRadius: 24,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: -50,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,142,247,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="section-label" style={{ justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {c.label}
          </div>

          <h2 className="section-title">
            {c.title}
            <span className="gradient-text">{c.titleAccent}</span>
          </h2>

          <p className="section-subtitle" style={{ marginBottom: 40, marginLeft: 'auto', marginRight: 'auto', maxWidth: 450 }}>
            {c.subtitle}
          </p>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@codeique.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', padding: '14px 32px', fontSize: 16 }}
          >
            {c.button}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
