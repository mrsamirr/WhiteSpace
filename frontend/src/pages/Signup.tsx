"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleAuth } from "../hooks/useGoogleAuth"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Signup = () => {
  const [name, setName] = useState("")
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
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.error || "Sign up failed")
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
          Join WhiteSpace
        </h1>
        <p className="text-center text-lg text-muted-foreground font-[family-name:var(--font-dm-sans)] mb-8">
          Create an account to start writing and reading
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
                text="signup_with"
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
                htmlFor="name"
                className="block text-sm font-semibold text-foreground mb-2 font-[family-name:var(--font-dm-sans)]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
                placeholder="Enter your full name"
              />
            </div>

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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
                placeholder="Create a secure password"
              />
              <p className="mt-2 text-xs text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                Password must be at least 6 characters long
              </p>
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
              {loading ? "Creating your account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-dm-sans)]">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
