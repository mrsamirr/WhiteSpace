"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleAuth } from "../hooks/useGoogleAuth"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { handleGoogleSuccess, handleGoogleError, loading: googleLoading, error: googleError } = useGoogleAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.error || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center shadow-lg">
            <span className="text-background font-bold text-2xl font-[family-name:var(--font-space-grotesk)]">W</span>
          </div>
        </div>
        <h1 className="text-center text-4xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)] mb-3">
          Welcome back
        </h1>
        <p className="text-center text-lg text-muted-foreground font-[family-name:var(--font-dm-sans)] mb-8">
          Sign in to continue your journey
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-10 px-8 shadow-xl border border-border rounded-2xl">
          <div className="mb-8">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </div>
            {googleError && (
              <p className="mt-3 text-sm text-destructive text-center font-[family-name:var(--font-dm-sans)]">
                {googleError}
              </p>
            )}
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-foreground mb-2 font-[family-name:var(--font-dm-sans)]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2 font-[family-name:var(--font-dm-sans)]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center font-[family-name:var(--font-dm-sans)]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-[family-name:var(--font-space-grotesk)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-dm-sans)]">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
