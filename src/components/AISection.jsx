import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

const icons = [
  // Chatbot / support
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>,
  // Sales / target
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
  </svg>,
  // Workflow / cogs
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>,
  // Integration / link
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>,
]

const cardColors = [
  { icon: '#4F8EF7', bg: 'rgba(79,142,247,0.08)', border: 'rgba(79,142,247,0.2)' },
  { icon: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  { icon: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' },
  { icon: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function AISection() {
  const { t } = useLang()
  const ai = t.ai

  return (
    <section id="ai" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            {ai.label}
          </div>
          <h2 className="section-title">
            {ai.title}<br />
            <span className="gradient-text">{ai.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{ai.subtitle}</p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {ai.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                background: 'var(--color-bg-card)',
                border: `1px solid ${cardColors[i].border}`,
                borderRadius: 20,
                padding: 32,
                boxShadow: 'var(--shadow-card)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card glow top-right */}
              <div style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${cardColors[i].icon}22 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: cardColors[i].bg,
                border: `1px solid ${cardColors[i].border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cardColors[i].icon,
                marginBottom: 20,
              }}>
                {icons[i]}
              </div>

              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 10,
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--color-text-primary)',
              }}>
                {card.title}
              </h3>

              <p style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: 'var(--color-text-secondary)',
              }}>
                {card.desc}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${cardColors[i].icon}00, ${cardColors[i].icon}88, ${cardColors[i].icon}00)`,
                opacity: 0.6,
              }} />
            </motion.div>
          ))}
        </motion.div>

        {/* n8n badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            borderRadius: 100,
            border: '1px solid var(--color-border)',
            background: 'var(--color-accent-soft)',
            fontSize: 13,
            color: 'var(--color-text-secondary)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-accent)' }}>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span>Powered by <strong style={{ color: 'var(--color-accent)' }}>n8n</strong> + custom AI agents</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
