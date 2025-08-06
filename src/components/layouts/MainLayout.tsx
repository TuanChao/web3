import { useEffect } from 'react'
import { Header } from '../ui/Header'
import { Footer } from '../../pages/footer'
import type { LayoutProps } from '../../Routes/type.routes'
import './MainLayout.css'

export default function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    // Apply theme to document
    if (shouldUseDark) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }

    // Listen for storage changes (when dark mode is toggled in Header)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const newTheme = e.newValue
        const shouldBeDark = newTheme === 'dark'
        if (shouldBeDark) {
          document.documentElement.classList.add('dark-theme')
        } else {
          document.documentElement.classList.remove('dark-theme')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
