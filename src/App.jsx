import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Cart from './components/Cart.jsx'

import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import ReservationPage from './pages/ReservationPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="hero-cta">Return Home</Link>
    </div>
  )
}

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(true)} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
