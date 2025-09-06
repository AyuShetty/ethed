'use client'

import { useAccount, useSignMessage, useChainId } from "wagmi"
import { SiweMessage } from "siwe"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function AuthClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  const handleLogin = async () => {
    if (!isConnected || !address || !chainId) {
      setError("Wallet not connected properly.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch CSRF nonce from next-auth (required for credentials provider)
      const res = await fetch("/api/auth/csrf")
      const { csrfToken } = await res.json()

      if (!csrfToken) throw new Error("Failed to fetch CSRF token.")

      // Build SIWE message
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: csrfToken,
      })

      // Sign SIWE message
      const signature = await signMessageAsync({
        message: siweMessage.prepareMessage(),
      })

      // Sign in using NextAuth credentials provider
      const response = await signIn("credentials", {
        message: JSON.stringify(siweMessage),
        signature,
        redirect: true,
        callbackUrl: "/",
      })

      if (!response?.ok) {
        throw new Error("Authentication failed.")
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unknown error occurred.")
      }
      console.error("[SIWE Login Error]:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="glass-card p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h1>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading || !isConnected}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Signing In..." : "Sign-In with Ethereum"}
          </button>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {!isConnected && (
            <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
              <p className="text-yellow-200 text-sm">Please connect your wallet first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
