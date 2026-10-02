import { Link, useLocation } from 'react-router-dom'
import { Download, Share, X, Smartphone } from 'lucide-react'
import { useInstallPrompt } from '../lib/pwa'
import '../styles/journal-motion.css'

/**
 * Install banner for the PWA — the single install affordance in the app.
 *
 * Appears once the browser has actually offered an install, or on iOS Safari
 * where that event does not exist and the only route is Add to Home Screen.
 * Dismissing is remembered permanently, and it never appears in the admin area
 * where it would only get in the way.
 */
export default function InstallBanner() {
  const { canInstall, iosInstructions, installed, dismissed, install, dismiss } = useInstallPrompt()
  const { pathname } = useLocation()

  if (installed || dismissed) return null
  if (!canInstall && !iosInstructions) return null
  if (pathname.startsWith('/admin')) return null

  return (
    <aside className="install-banner" aria-label="Install the OMIX Journal app">
      <img src="/pwa-192x192.png" alt="" className="install-banner-icon" width="52" height="52" />

      <div className="install-banner-copy">
        <p className="kicker">
          <Smartphone size={14} aria-hidden="true" /> Install the app
        </p>
        <p className="install-banner-title">Keep the Journal on your home screen</p>

        {canInstall ? (
          <p className="install-banner-text">
            Opens full screen, works offline, and the quote calculator is one tap away.
          </p>
        ) : (
          <p className="install-banner-text">
            Tap <Share size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px' }} /> Share, then{' '}
            <strong>Add to Home Screen</strong>.
          </p>
        )}
      </div>

      <div className="install-banner-actions">
        {canInstall ? (
          <button type="button" onClick={install} className="btn btn-sm btn-accent">
            <Download size={16} aria-hidden="true" /> Install
          </button>
        ) : (
          <Link to="/wiki" className="btn btn-sm btn-secondary">Read offline</Link>
        )}
        <button type="button" onClick={dismiss} className="install-banner-close" aria-label="Dismiss install banner">
          <X size={17} aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}
