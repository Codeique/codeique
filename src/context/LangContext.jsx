import { createContext, useContext, useState } from 'react'
import { translations } from '../data/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('codeique-lang') || 'en'
  })

  const toggle = () => {
    const next = lang === 'en' ? 'sr' : 'en'
    setLang(next)
    localStorage.setItem('codeique-lang', next)
  }

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
