import { useTheme } from '../context/ThemeContext'

const shapes = [
  // large blobs
  { type: 'blob', style: { top: '8%', left: '-8%', width: 480, height: 480, opacity: 0.18, animationDuration: '18s', animationDelay: '0s', color: 'accent' } },
  { type: 'blob', style: { top: '60%', right: '-10%', width: 560, height: 560, opacity: 0.12, animationDuration: '22s', animationDelay: '-7s', color: 'purple' } },
  { type: 'blob', style: { top: '35%', left: '40%', width: 320, height: 320, opacity: 0.10, animationDuration: '26s', animationDelay: '-12s', color: 'cyan' } },
  // small blobs
  { type: 'blob', style: { top: '85%', left: '15%', width: 200, height: 200, opacity: 0.15, animationDuration: '14s', animationDelay: '-4s', color: 'accent' } },
  { type: 'blob', style: { top: '20%', right: '20%', width: 140, height: 140, opacity: 0.20, animationDuration: '12s', animationDelay: '-9s', color: 'purple' } },
  // rings
  { type: 'ring', style: { top: '15%', right: '5%', width: 260, height: 260, opacity: 0.08, animationDuration: '30s' } },
  { type: 'ring', style: { top: '70%', left: '5%', width: 180, height: 180, opacity: 0.07, animationDuration: '24s', animationDelay: '-15s' } },
  // dots grid
  { type: 'dots', style: { top: '5%', right: '8%', opacity: 0.12 } },
  { type: 'dots', style: { bottom: '10%', left: '6%', opacity: 0.10 } },
]

function getBlobColor(color, theme) {
  const dark = { accent: '#4F8EF7', purple: '#8B5CF6', cyan: '#06B6D4' }
  const light = { accent: '#2563EB', purple: '#7C3AED', cyan: '#0891B2' }
  return theme === 'dark' ? dark[color] : light[color]
}

function DotGrid({ style }) {
  return (
    <svg
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        ...style,
      }}
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 20 + 10}
            cy={row * 20 + 10}
            r="1.5"
            fill="currentColor"
            style={{ animation: `dot-pulse ${2 + (row + col) * 0.15}s ease-in-out infinite`, animationDelay: `${(row * col * 0.05) % 2}s` }}
          />
        ))
      )}
    </svg>
  )
}

export default function BackgroundShapes() {
  const { theme } = useTheme()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        color: 'var(--color-text-muted)',
      }}
    >
      {shapes.map((shape, i) => {
        if (shape.type === 'dots') {
          return <DotGrid key={i} style={shape.style} />
        }

        if (shape.type === 'ring') {
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                borderRadius: '50%',
                border: `1px solid var(--color-accent)`,
                width: shape.style.width,
                height: shape.style.height,
                top: shape.style.top,
                right: shape.style.right,
                left: shape.style.left,
                bottom: shape.style.bottom,
                opacity: shape.style.opacity,
                animation: `rotate-slow ${shape.style.animationDuration} linear infinite`,
                animationDelay: shape.style.animationDelay,
              }}
            />
          )
        }

        // blob
        const color = getBlobColor(shape.style.color, theme)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              borderRadius: '50%',
              width: shape.style.width,
              height: shape.style.height,
              top: shape.style.top,
              right: shape.style.right,
              left: shape.style.left,
              bottom: shape.style.bottom,
              opacity: shape.style.opacity,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              filter: 'blur(60px)',
              animation: `float ${shape.style.animationDuration} ease-in-out infinite`,
              animationDelay: shape.style.animationDelay,
            }}
          />
        )
      })}

      {/* Subtle grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
