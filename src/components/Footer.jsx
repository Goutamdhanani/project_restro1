import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contactDetails, hours, socialLinks } from '../data/menuData'
import { useToast } from './Toast'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Blog' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const toast = useToast()

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address.', 'error')
      return
    }
    toast('Thank you for subscribing!', 'success')
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <h3>Qitchen</h3>
          <p>Sushi artistry redefined</p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            {contactDetails.map((c) => (
              <li key={c.label}>{c.value}</li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="footer-col">
          <h4>Hours</h4>
          <ul>
            {hours.map(([day, time]) => (
              <li key={day}>{day}: {time}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <h4>Stay updated with our seasonal menus</h4>
        <form className="footer-newsletter-form" onSubmit={handleNewsletter}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email for newsletter"
          />
          <button type="submit">Subscribe</button>
        </form>
        <div className="footer-socials">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-socials-link"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2026 Qitchen. All rights reserved.</p>
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          type="button"
        >
          ↑
        </button>
      </div>
    </footer>
  )
}
