'use client'

import dynamic from 'next/dynamic'

const AuthClient = dynamic(() => import('./AuthClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="glass-card p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        <div className="animate-pulse">
          <div className="h-12 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  )
})

export default function AuthPage() {
  return <AuthClient />
}
