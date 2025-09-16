import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import RoutesApp from './Routes/indexx.routes'
import { Intro } from './components/Intro'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        {showIntro && <Intro onComplete={handleIntroComplete} duration={3000} />}
        <RoutesApp />
      </div>
    </BrowserRouter>
  )
}

export default App
