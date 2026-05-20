import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservation', label: 'Reservation' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar({ onCartClick }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <nav
      className={`floating-nav${scrolled ? ' is-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="brand-mark" onClick={closeMenu}>
        Qitchen
      </Link>

      <div className={`nav-links${open ? ' is-open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
            onClick={closeMenu}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <button
        className="cart-badge"
        onClick={onCartClick}
        aria-label={`Cart with ${totalItems} items`}
        type="button"
      >
        🛒{totalItems > 0 && <span className="cart-badge-count">{totalItems}</span>}
      </button>

      <button
        className={`nav-toggle${open ? ' is-active' : ''}`}
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
