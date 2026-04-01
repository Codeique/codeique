import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const spring = useSpring(progress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(scrolled)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    spring.set(progress)
  }, [progress, spring])

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: spring, width: '100%' }}
    />
  )
}
