import { Download, Clock } from 'lucide-react'

/**
 * Store availability badges for the footer.
 *
 * Text-led on purpose: reproducing vendor logos means shipping trademarked
 * artwork that has to be kept in sync with each store's brand guidelines, and
 * the hand-drawn system is wordmark-led anyway.
 *
 * The Android badge points at the signed APK, which is the same app wrapped as
 * a Trusted Web Activity. The iOS badge is deliberately not a link — it becomes
 * one when there is a listing behind it.
 */
export default function StoreBadges() {
  return (
    <div className="store-badges">
      <a
        className="store-badge"
        href="https://omixsystems.store/omix-journal.apk"
        rel="noreferrer"
      >
        <Download size={16} aria-hidden="true" />
        <span>
          <small>Get the app</small>
          Android · APK
        </span>
      </a>

      <span className="store-badge is-pending" title="Available once the App Store listing is live">
        <Clock size={16} aria-hidden="true" />
        <span>
          <small>Coming soon</small>
          iOS · App Store
        </span>
      </span>
    </div>
  )
}
