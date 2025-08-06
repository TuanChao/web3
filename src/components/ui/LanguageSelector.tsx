import { useState } from 'react'
import './LanguageSelector.css'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Here you would integrate with i18n library
    console.log('Switching to language:', language.name)
  }

  return (
    <div className="language-selector-container">
      <button 
        className="language-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-flag">{selectedLanguage.flag}</span>
        <span className="language-code">{selectedLanguage.code.toUpperCase()}</span>
        <svg 
          className={`language-dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="language-dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="language-dropdown">
            <div className="language-dropdown-header">
              <h3>Select Language</h3>
            </div>
            <div className="language-list">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`language-option ${selectedLanguage.code === language.code ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <span className="language-flag">{language.flag}</span>
                  <span className="language-name">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <div className="language-selected-indicator">
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path 
                          d="M13.5 4.5L6 12L2.5 8.5" 
                          stroke="#1fc7d4" 
                          strokeWidth="2" 
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
