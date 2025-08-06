import { useState, useEffect } from 'react'
import './DarkModeToggle.css'

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true) // Mặc định là dark

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Mặc định là dark nếu không có preference được lưu
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <button 
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div className={`toggle-container ${isDark ? 'dark' : 'light'}`}>
        <div className="toggle-slider">
          {isDark ? (
            <svg className="toggle-icon moon" width="12" height="12" viewBox="0 0 16 16">
              <path 
                d="M6 0.5C6 0.5 6 3 8 5S13.5 6 13.5 6S13.5 6 11.5 8S6 13.5 6 13.5S6 13.5 4 11.5S-1.5 6 -1.5 6S-1.5 6 0.5 4S6 0.5 6 0.5Z" 
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg className="toggle-icon sun" width="12" height="12" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="3" fill="currentColor"/>
              <path 
                d="M8 1V3M8 13V15M15 8H13M3 8H1M12.5 3.5L11.5 4.5M4.5 11.5L3.5 12.5M12.5 12.5L11.5 11.5M4.5 4.5L3.5 3.5" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}
