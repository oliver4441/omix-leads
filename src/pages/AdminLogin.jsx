import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Loader2, Eye, EyeOff, BarChart3 } from 'lucide-react'
import { supabase } from '../lib/supabase'

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand/20">
            <BarChart3 size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Login</h1>
          <p className="text-zinc-400 text-sm">Sign in with your authorized Supabase account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            autoComplete="email"
            autoFocus
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-brand/50 focus:border-brand outline-none transition-all text-sm"
          />
          <div className="relative">
            <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-11 py-3.5 pr-12 text-white placeholder-zinc-500 focus:ring-2 focus:ring-brand/50 focus:border-brand outline-none transition-all text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
