import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import boutiqueImg from '../assets/botique.png'

const systemAccents = [
  { primary: '#4F8EF7', secondary: '#06B6D4', icon: '🤖', iconLabel: 'Chatbot' },
  { primary: '#8B5CF6', secondary: '#EC4899', icon: '🌐', iconLabel: 'Web' },
  { primary: '#10B981', secondary: '#06B6D4', icon: '🛍️', iconLabel: 'Shop' },
  { primary: '#F59E0B', secondary: '#EF4444', icon: '💳', iconLabel: 'Payments' },
]


// Placeholder screenshot content — swapped out when a real image is available
function ScreenshotPlaceholder({ accent, icon, index }) {
  return (
    <div style={{
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(145deg, ${accent.primary}18 0%, ${accent.secondary}12 50%, ${accent.primary}08 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${accent.primary}10 1px, transparent 1px),
          linear-gradient(90deg, ${accent.primary}10 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Background blobs */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 220,
        height: 220,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent.primary}28 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent.secondary}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Mock UI skeleton cards — gives a real "app screenshot" vibe */}
      <div style={{
        position: 'absolute',
        inset: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        opacity: 0.45,
      }}>
        {/* Top bar mock */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 80, height: 8, borderRadius: 4, background: accent.primary }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 40, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ width: 40, height: 8, borderRadius: 4, background: accent.primary, opacity: 0.6 }} />
        </div>
        {/* Stat row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {[accent.primary, accent.secondary, 'rgba(255,255,255,0.15)'].map((c, i) => (
            <div key={i} style={{
              flex: 1,
              height: 52,
              borderRadius: 8,
              background: `${c}40`,
              border: `1px solid ${c}50`,
            }} />
          ))}
        </div>
        {/* Content rows */}
        {[0.9, 0.7, 0.5].map((o, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', opacity: o }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `${accent.primary}40`, flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ width: `${75 - i * 10}%`, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: `${55 - i * 8}%`, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }} />
            </div>
            <div style={{ width: 36, height: 20, borderRadius: 4, background: `${accent.primary}50` }} />
          </div>
        ))}
      </div>

      {/* Center: floating icon with glow */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
      >
        <div style={{
          fontSize: 56,
          filter: `drop-shadow(0 0 24px ${accent.primary}80) drop-shadow(0 8px 16px rgba(0,0,0,0.3))`,
          marginBottom: 8,
          display: 'block',
        }}>
          {icon}
        </div>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: accent.primary,
          fontFamily: 'Inter, sans-serif',
          background: `${accent.primary}15`,
          border: `1px solid ${accent.primary}30`,
          padding: '3px 10px',
          borderRadius: 100,
        }}>
          screenshot coming soon
        </div>
      </motion.div>
    </div>
  )
}

function SystemCard({ item, accent, index, badge, visitLabel, comingSoon, screenshot }) {
  const hasUrl = false // temporarily disabled — all products coming soon

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 28,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Hover glow border effect */}
      <motion.div
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 28,
          padding: 1,
          background: `linear-gradient(135deg, ${accent.primary}60, ${accent.secondary}60)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Screenshot / image area */}
      <div style={{
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
        {screenshot ? (
          <img
            src={screenshot}
            alt={`${item.name} screenshot`}
            style={{ flex: 1, width: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
        ) : (
          <ScreenshotPlaceholder accent={accent} icon={accent.icon} index={index} />
        )}

        {/* Product name badge — floating bottom-left of screenshot */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px 6px 10px',
          borderRadius: 100,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${accent.primary}40`,
          zIndex: 5,
        }}>
          <span style={{ fontSize: 18 }}>{accent.icon}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {item.name}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '28px 32px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* SaaS badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 100,
          background: `${accent.primary}12`,
          border: `1px solid ${accent.primary}28`,
          color: accent.primary,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 16,
          width: 'fit-content',
        }}>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: accent.primary }}
          />
          {badge}
        </div>

        <p style={{
          fontSize: 15,
          lineHeight: 1.75,
          color: 'var(--color-text-secondary)',
          flex: 1,
          marginBottom: 28,
        }}>
          {item.desc}
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {hasUrl ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 22px',
                borderRadius: 12,
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
                boxShadow: `0 4px 16px ${accent.primary}30`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${accent.primary}50`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 4px 16px ${accent.primary}30`
              }}
            >
              {visitLabel}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 22px',
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {comingSoon}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function SystemsSection() {
  const { t } = useLang()
  const s = t.systems

  return (
    <section id="systems" className="section" style={{ position: 'relative', zIndex: 1 }}>
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
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            {s.label}
          </div>
          <h2 className="section-title">
            {s.title}<br />
            <span className="gradient-text">{s.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{s.subtitle}</p>
        </motion.div>

        {/* 2-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
        }}
          className="systems-grid"
        >
          {s.items.map((item, i) => (
            <SystemCard
              key={item.name}
              item={item}
              accent={systemAccents[i]}
              index={i}
              badge={s.badge}
              visitLabel={s.visit}
              comingSoon={s.comingSoon}
              screenshot={i === 0 ? boutiqueImg : null}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .systems-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
