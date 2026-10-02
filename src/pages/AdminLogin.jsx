import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Loader2, Eye, EyeOff, BarChart3 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { CornerMarks } from '../components/Doodles'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!supabase) {
      setError('Admin authentication is not configured. Set the Supabase environment variables first.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError) {
      setError(authError.message || 'Invalid email or password.')
      setLoading(false)
      return
    }

    navigate('/admin')
    setLoading(false)
  }

  return (
    <div className="hand-page grid min-h-[80vh] place-items-center px-5 py-16">
      <div className="narrow-narrow w-full">
        <div className="card card-pad relative">
          <CornerMarks />
          <div className="text-center">
            <span className="topic-icon mx-auto" aria-hidden="true"><BarChart3 size={22} /></span>
            <h1 className="hand-h2 mt-5">Admin login</h1>
            <p className="ink-soft mt-3">Sign in with your authorised Supabase account.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <label className="field-label" htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
              className="field"
            />

            <label className="field-label mt-5" htmlFor="admin-password">Password</label>
            <div className="relative">
              <Lock size={17} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 muted" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="field pl-11 pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 muted"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
              </button>
            </div>

            {error && <p className="notice-error" role="alert">{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-lg mt-7 w-full">
              {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Signing in…</> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
