import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { socialLinks } from '../data/menuData.js'
import PageTransition from '../components/PageTransition.jsx'

const featureCards = [
  {
    title: 'Menu',
    to: '/menu',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Reservation',
    to: '/reservation',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Our Restaurant',
    to: '/about',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
  },
]

const stats = [
  { target: 12, suffix: '', label: 'Years of Excellence' },
  { target: 50, suffix: 'K+', label: 'Happy Guests' },
  { target: 200, suffix: '+', label: 'Signature Dishes' },
  { target: 15, suffix: '', label: 'Master Chefs' },
]

const testimonials = [
  {
    quote: "An unforgettable culinary journey through Japan's finest flavors.",
    author: 'Sophia Chen',
  },
  {
    quote: 'The atmosphere alone is worth the visit. The sushi makes it transcendent.',
    author: 'Marcus Rivera',
  },
  {
    quote: 'Every detail, from plating to pacing, shows true mastery.',
    author: 'Elena Dubois',
  },
]

function useCounter(target, isVisible) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let current = 0
    const step = Math.max(1, Math.floor(target / 40))
    const id = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(id)
      } else {
        setCount(current)
      }
    }, 30)
    return () => clearInterval(id)
  }, [target, isVisible])
  return count
}

function StatCard({ target, suffix, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCounter(target, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)

  useEffect(() => {
    document.title = 'Qitchen | Premium Dark-Theme Sushi Restaurant'
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY
        heroRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.1)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="hero-section" id="hero">
        <img
          ref={heroRef}
          className="hero-bg"
          src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80"
          alt="Sushi selection plated on a dark ceramic dish"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">Qitchen signature</span>
          <h1 className="hero-title">Sushi Sensation</h1>
          <Link to="/menu" className="hero-cta">Explore Our Menu</Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features-section">
        <div className="features-grid">
          {featureCards.map((card) => (
            <Link key={card.title} to={card.to} className="feature-card">
              <img src={card.image} alt={card.title} loading="lazy" />
              <div className="card-footer">
                <span>{card.title}</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          What our guests say
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <article key={t.author} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <span className="testimonial-author">— {t.author}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Socials */}
      <div className="home-socials">
        {socialLinks.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        ))}
      </div>
    </PageTransition>
  )
}
