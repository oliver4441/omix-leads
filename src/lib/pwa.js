/* ============================================================================
   PWA wiring.
   ----------------------------------------------------------------------------
   vite-plugin-pwa generates the service worker, but under Vite 8/Rolldown its
   bundle hook is skipped, so it cannot register the worker for us. This module
   owns registration, update handling and the install experience.
   ========================================================================== */

import { useCallback, useEffect, useState } from 'react'

const DISMISS_KEY = 'omix-install-dismissed'
const INSTALLED_KEY = 'omix-installed'

function readFlag(key) {
  try {
    return localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

function writeFlag(key) {
  try {
    localStorage.setItem(key, '1')
  } catch {
    /* private mode — the prompt simply reappears next visit */
  }
}

/**
 * Register the service worker. Safe to call unconditionally: it no-ops in
 * environments without support and in dev, where a worker would serve stale
 * shells over HMR.
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  if (import.meta.env.DEV) return

  // Captured before registering: a first-ever install also fires
  // `controllerchange`, and reloading there would look like a crash-loop.
  const hadController = !!navigator.serviceWorker.controller

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      /* offline support is a bonus; never let it break the page */
    })
  })

  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || refreshing) return
    refreshing = true
    window.location.reload()
  })
}

/** True when the app is already running from the home screen / app switcher. */
export function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.matchMedia?.('(display-mode: minimal-ui)').matches ||
    window.navigator.standalone === true
  )
}

/**
 * iOS never fires `beforeinstallprompt`, so the only honest option there is to
 * tell the user where Safari hides the action. Everything else gets a real
 * install button.
 */
export function isIosSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA/.test(ua)
  return ios && safari
}

/**
 * Install affordance. Returns whether an install can be offered right now, the
 * trigger to call from a click handler (the event must stay in the gesture's
 * call stack), and dismissal state.
 */
export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null)
  const [installed, setInstalled] = useState(() => readFlag(INSTALLED_KEY) || isStandalone())
  const [dismissed, setDismissed] = useState(() => readFlag(DISMISS_KEY))

  useEffect(() => {
    const onBeforeInstall = (event) => {
      // Keep the event so it can be fired from our own button later.
      event.preventDefault()
      setPromptEvent(event)
    }
    const onInstalled = () => {
      writeFlag(INSTALLED_KEY)
      setInstalled(true)
      setPromptEvent(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    if (!promptEvent) return 'unavailable'
    await promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice
    setPromptEvent(null)
    if (outcome === 'accepted') writeFlag(INSTALLED_KEY)
    return outcome
  }, [promptEvent])

  const dismiss = useCallback(() => {
    writeFlag(DISMISS_KEY)
    setDismissed(true)
  }, [])

  return {
    canInstall: !!promptEvent,
    iosInstructions: !promptEvent && isIosSafari(),
    installed,
    dismissed,
    install,
    dismiss,
  }
}
