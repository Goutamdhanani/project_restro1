import { useEffect, useState } from 'react'
import { awards, galleryImages } from '../data/menuData.js'
import PageTransition from '../components/PageTransition.jsx'

const team = [
  {
    name: 'Chef Takeshi Yamamoto',
    role: 'Executive Chef',
    bio: '20 years mastering the art of Edomae sushi in Tokyo before bringing his vision to New York.',
    initials: 'TY',
    gradient: 'linear-gradient(135deg, #2a1f14, #1a1210)',
  },
  {
    name: 'Chef Ayumi Sato',
    role: 'Pastry Chef',
    bio: 'Trained in Paris and Kyoto, creating desserts that bridge French technique with Japanese aesthetics.',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #1a1420, #120e18)',
  },
  {
    name: 'Chef Marco Delgado',
    role: 'Sous Chef',
    bio: 'A fusion innovator whose Latin heritage adds unexpected warmth to classic Japanese forms.',
    initials: 'MD',
    gradient: 'linear-gradient(135deg, #14201a, #0e1812)',
  },
]

export default function AboutPage() {
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    document.title = 'Qitchen | About Us'
  }, [])

  return (
    <PageTransition>
      {/* Hero */}
      <div className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1400&q=80"
          alt="Chef sprinkling seasoning over a plated dish"
          loading="lazy"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="eyebrow">Our philosophy</span>
          <h1>About Qitchen</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="about-intro">
        <h2 className="section-heading">Sushi artistry redefined</h2>
        <p>
          Qitchen blends Japanese precision with cinematic plating, creating an intimate room where
          every service feels like an after-dark premiere. Our craft is rooted in respect for
          ingredients and driven by a passion to surprise and delight.
        </p>
      </section>

      {/* Awards */}
      <section className="awards-section">
        <div className="award-grid">
          {awards.map((award) => (
            <article key={award.value} className="award-card">
              <strong>{award.value}</strong>
              <p>{award.label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="story-section">
        <div className="story-grid">
          <img
            className="story-image"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
            alt="Chefs working together in a warm kitchen"
            loading="lazy"
          />
          <div className="story-content">
            <h3>Born from reverence, refined through contrast</h3>
            <p>
              Our dining room was built around the tension between quiet luxury and raw ingredient
              energy. The result is a restaurant that feels deeply contemporary yet rooted in timeless
              hospitality. Every surface, shadow and aroma has been considered to transport our guests
              into a sensory journey that transcends ordinary dining.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2 className="section-heading">Meet our chefs</h2>
        <div className="team-grid">
          {team.map((chef) => (
            <div key={chef.name} className="team-card">
              <div className="team-card-bg" style={{ background: chef.gradient }}>
                {chef.initials}
              </div>
              <div className="team-card-overlay">
                <h3 className="team-name">{chef.name}</h3>
                <p className="team-role">{chef.role}</p>
                <p className="team-bio">{chef.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <h2 className="section-heading">Gallery</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <img
              key={img}
              className="gallery-img"
              src={img}
              alt={`Qitchen gallery scene ${idx + 1}`}
              loading="lazy"
              onClick={() => setLightboxImg(img)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightboxImg(null) }}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img className="lightbox-image" src={lightboxImg} alt="Gallery enlarged view" />
        </div>
      )}
    </PageTransition>
  )
}
