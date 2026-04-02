import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import logo from '../assets/CodeiqueLogo.png'

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'ai', href: '#ai' },
  { key: 'systems', href: '#systems' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
]

const products = [
  { name: 'Botique', url: null },
  { name: 'Webique', url: null },
  { name: 'Shopique', url: null },
  { name: 'Remique', url: null },
]

export default function Footer() {
  const { t } = useLang()

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--color-border)',
      background: 'var(--color-bg-elevated)',
      paddingTop: 64,
      paddingBottom: 32,
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: -1,
        left: '20%',
        right: '20%',
        height: 1,
        background: 'var(--color-gradient)',
        opacity: 0.6,
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: 48,
          marginBottom: 48,
        }}
        className="footer-grid"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src={logo} alt="Codeique" style={{ height: 32, width: 'auto' }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                background: 'var(--color-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Codeique
              </span>
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              maxWidth: 280,
            }}>
              {t.footer.tagline}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: 16,
            }}>
              {t.footer.nav}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(link => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={e => handleNav(e, link.href)}
                    style={{
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: 16,
            }}>
              {t.footer.products}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {products.map(p => (
                <li key={p.name}>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 14,
                        color: 'var(--color-text-secondary)',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                    >
                      {p.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
                      {p.name} <span style={{ fontSize: 11, opacity: 0.6 }}>soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 24 }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{t.footer.copyright}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
