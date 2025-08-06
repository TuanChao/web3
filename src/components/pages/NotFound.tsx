import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-link">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
