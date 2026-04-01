import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import Home from './pages/Home'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Home />
      </LangProvider>
    </ThemeProvider>
  )
}
