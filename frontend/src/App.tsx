import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Profile } from "./pages/Profile"
import { Category } from "./pages/Category"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import Help from "./pages/Help"
import Status from "./pages/Status"
import About from "./pages/About"
import Careers from "./pages/Carrers"
import Press from "./pages/Press"
import Privacy from "./pages/Privacy"
import Rules from "./pages/Rules"
import Terms from "./pages/Terms"
import TextToSpeech from "./pages/TextToSpeech"
import NotFound from "./pages/NotFound"
import ThePage from "./pages/ThePage"
import { ProtectedRoute } from "./components/ProtectedRoutes"
import { PublicRoutes } from "./components/PublicRoutes"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GOOGLE_CLIENT_ID } from "./config"



function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/signup"
            element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoutes>
                <Signin />
              </PublicRoutes>
            }
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<ThePage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/status" element={<Status />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publish"
            element={
              <ProtectedRoute>
                <Publish />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
