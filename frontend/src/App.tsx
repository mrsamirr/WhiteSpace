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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Blog Routes */}
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/category/:slug" element={<Category />} />
          
          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/publish" element={<Publish />} />
          
          {/* Static Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/status" element={<Status />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
