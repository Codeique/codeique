import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import logo from '../assets/CodeiqueLogo.png'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'ai', href: '#ai' },
    { key: 'systems', href: '#systems' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  const handleLink = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          background: scrolled ? 'var(--navbar-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--navbar-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#home" onClick={e => handleLink(e, '#home')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="Codeique" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                onClick={e => handleLink(e, link.href)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  transition: 'color 0.2s, background 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                  e.currentTarget.style.background = 'var(--color-accent-soft)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {t.nav[link.key]}
              </a>
            ))}

            <div style={{ width: 1, height: 24, background: 'var(--color-border)', margin: '0 8px' }} />

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              title="Toggle language"
              style={{
                width: 52,
                height: 32,
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'var(--color-accent-soft)',
                color: 'var(--color-accent)',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              {lang === 'en' ? 'SR' : 'EN'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'var(--color-accent-soft)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="hamburger"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              padding: 8,
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-accent-soft)',
            }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  borderRadius: 2,
                  background: 'var(--color-accent)',
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform:
                    mobileOpen
                      ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)'
                      : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 68,
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'var(--color-bg-elevated)',
              borderBottom: '1px solid var(--color-border)',
              padding: '16px 24px 24px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 1200, margin: '0 auto' }}>
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={e => handleLink(e, link.href)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {t.nav[link.key]}
                </a>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingLeft: 16 }}>
                <button
                  onClick={toggleLang}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {lang === 'en' ? 'SR' : 'EN'}
                </button>
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
