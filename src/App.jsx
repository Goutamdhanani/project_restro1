import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reservation', href: '#reservation' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '#blog' },
]

const homeCards = [
  {
    title: 'Menu',
    href: '#menu',
    image:
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Reservation',
    href: '#reservation',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Our Restaurant',
    href: '#about',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
  },
]

const menuCategories = ['Maki', 'Uramaki', 'Special Rolls']

const menuItems = [
  {
    category: 'Maki',
    title: 'Salmon Whisper',
    description: 'Ora king salmon, shiso, citrus kosho and smoked soy.',
    price: '$18',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Maki',
    title: 'Midnight Tuna',
    description: 'Bluefin, black garlic emulsion, pickled daikon and sesame ash.',
    price: '$19',
    image:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Maki',
    title: 'Crisp Garden',
    description: 'Avocado, cucumber, tempura crumbs and yuzu miso glaze.',
    price: '$16',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Uramaki',
    title: 'Snow Crab Silk',
    description: 'King crab, avocado, cucumber and white soy pearls.',
    price: '$22',
    image:
      'https://images.unsplash.com/photo-1582450871972-ab5ca9c9129f?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Uramaki',
    title: 'Firefly Roll',
    description: 'Spicy scallop, cucumber ribbons and charred jalapeño oil.',
    price: '$21',
    image:
      'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Uramaki',
    title: 'Ocean Ember',
    description: 'Prawn tempura, snow crab, togarashi caramel and lime zest.',
    price: '$23',
    image:
      'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Special Rolls',
    title: 'Qitchen Signature',
    description: 'A5 wagyu, truffle ponzu, crispy leek and oscietra caviar.',
    price: '$32',
    image:
      'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Special Rolls',
    title: 'Velvet Blossom',
    description: 'Torched salmon, strawberry ponzu and sakura salt.',
    price: '$28',
    image:
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80',
  },
  {
    category: 'Special Rolls',
    title: 'Golden Reef',
    description: 'Lobster tempura, uni crema, chive oil and lemon blossom.',
    price: '$30',
    image:
      'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=400&q=80',
  },
]

const awards = [
  { value: '5.0', label: 'Five star dining experience' },
  { value: 'Trip Advisor', label: 'Travelers\' choice 2026' },
  { value: 'Michelin Guide', label: 'Recommended tasting menu' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=600&q=80',
]

const blogPosts = [
  {
    title: 'How Qitchen redefines flavor harmony',
    date: 'May 18, 2026',
    excerpt: 'Discover how smoke, acid and texture are layered into every omakase course.',
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    detailTitle: 'Unveiling culinary artistry',
    detailBody:
      'Every plate at Qitchen begins with a study in contrast: warm charcoal notes against chilled seafood, polished lacquer against living texture. Our chefs refine each course around clarity, not excess, resulting in a tasting experience that feels cinematic and intimate at once.',
    detailTitleTwo: 'Crafting a feast',
    detailBodyTwo:
      'The menu moves like a story. Delicate bites introduce brightness, richer courses deepen the mood, and the finale lands with elegant restraint. This pacing lets each ingredient speak while creating a memorable rhythm from first pour to final tea.',
  },
  {
    title: 'Inside our late-night omakase ritual',
    date: 'May 04, 2026',
    excerpt: 'A closer look at the candlelit service, rare fish cuts and chef-led pairings.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    detailTitle: 'A room designed for focus',
    detailBody:
      'Lighting remains low so gloss, steam and flame become part of the performance. Guests are invited to slow down, observe and savor, turning dinner into a curated sequence of sensory moments.',
    detailTitleTwo: 'Pairings with intention',
    detailBodyTwo:
      'Rare sake pours, mineral white wines and delicate teas are matched to texture as much as flavor. The result is an experience that lingers in memory long after the final course.',
  },
  {
    title: 'The sourcing philosophy behind our menu',
    date: 'April 21, 2026',
    excerpt: 'Seasonality, line-caught seafood and exacting produce standards drive every service.',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    detailTitle: 'Selected at the source',
    detailBody:
      'Our team builds close relationships with fishmongers and growers who share our respect for ingredient integrity. That sourcing discipline allows the menu to evolve with confidence and precision.',
    detailTitleTwo: 'Elegance through restraint',
    detailBodyTwo:
      'Instead of overwhelming ingredients with technique, the kitchen uses detail to reveal their natural depth. The final plate feels contemporary, but its philosophy remains timeless.',
  },
]

const contactDetails = [
  { label: 'Address', value: '24 Kintsugi Lane, New York, NY 10013' },
  { label: 'Phone', value: '+1 (212) 555-0148' },
  { label: 'Email', value: 'reserve@qitchen.com' },
]

const hours = [
  ['Mon — Thu', '17:30 — 22:30'],
  ['Fri — Sat', '17:30 — 00:00'],
  ['Sun', '16:00 — 21:30'],
]

const socialLinks = [
  { label: 'Ig', href: 'https://instagram.com' },
  { label: 'Fb', href: 'https://facebook.com' },
  { label: 'X', href: 'https://x.com' },
]

const initialForm = {
  name: '',
  phone: '',
  email: '',
  guests: '2 Guests',
  date: '',
  time: '',
}

function App() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0])
  const [selectedPost, setSelectedPost] = useState(blogPosts[0])
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [reservationForm, setReservationForm] = useState(initialForm)
  const [reservationMessage, setReservationMessage] = useState('')

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.18 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const filteredMenu = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const handleReservationChange = ({ target }) => {
    const { name, value } = target
    setReservationForm((current) => ({ ...current, [name]: value }))
    setReservationMessage('')
  }

  const handleReservationSubmit = (event) => {
    event.preventDefault()
    setReservationMessage(
      `Thank you, ${reservationForm.name || 'guest'} — your request for ${reservationForm.guests.toLowerCase()} has been received.`,
    )
    setReservationForm(initialForm)
  }

  const closeNav = () => setIsNavOpen(false)

  return (
    <div className="app-shell">
      <header className="floating-nav reveal is-visible">
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <a className="brand-mark" href="#home" onClick={closeNav}>
          Qitchen
        </a>
        <nav className={`nav-links ${isNavOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeNav}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="section home-section reveal">
          <div className="home-hero panel image-panel">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80"
              alt="Sushi selection plated on a dark ceramic dish"
            />
            <div className="section-label-wrap">
              <span className="eyebrow">Qitchen signature</span>
              <h1>Sushi sensation</h1>
            </div>
          </div>

          <div className="home-stack">
            {homeCards.map((card) => (
              <a key={card.title} href={card.href} className="feature-card panel image-panel">
                <img src={card.image} alt={card.title} />
                <div className="card-footer">
                  <span>{card.title}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </a>
            ))}
          </div>

          <div className="home-socials">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <SplitSection
          id="menu"
          title="Menu"
          image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Chef holding a dark bowl with plated food"
          eyebrow="Curated rolls"
        >
          <div className="content-panel panel reveal is-visible">
            <div className="panel-header">
              <p className="eyebrow">Qitchen menu</p>
              <h2>Signature maki & rolls</h2>
              <p className="muted-copy">
                Choose a category to explore our seasonal signatures, balanced with brightness,
                smoke and refined texture.
              </p>
            </div>

            <div className="pill-row" role="tablist" aria-label="Menu categories">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`pill-button ${activeCategory === category ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="section-ornament">
              <span />
              <strong>{activeCategory}</strong>
              <span />
            </div>

            <div className="menu-list">
              {filteredMenu.map((item) => (
                <article key={item.title} className="menu-item panel-subtle">
                  <img src={item.image} alt={item.title} className="menu-thumb" />
                  <div>
                    <div className="menu-title-row">
                      <h3>{item.title}</h3>
                      <span className="menu-icon">✦</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <strong className="menu-price">{item.price}</strong>
                </article>
              ))}
            </div>
          </div>
        </SplitSection>

        <SplitSection
          id="reservation"
          title="Book a table"
          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Wine glasses on a warmly lit restaurant table"
          eyebrow="Reserve now"
        >
          <div className="content-panel panel reveal is-visible">
            <div className="panel-header">
              <p className="eyebrow">Reservation</p>
              <h2>Curate your evening</h2>
              <p className="muted-copy">
                Secure your seat for a moody dining ritual shaped by fire, fragrance and chef-led
                storytelling.
              </p>
            </div>

            <form className="reservation-form" onSubmit={handleReservationSubmit}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={reservationForm.name}
                  onChange={handleReservationChange}
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={reservationForm.phone}
                  onChange={handleReservationChange}
                  placeholder="(000) 000-0000"
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={reservationForm.email}
                  onChange={handleReservationChange}
                  placeholder="guest@example.com"
                  required
                />
              </label>
              <div className="reservation-grid">
                <label>
                  <span>Guests</span>
                  <select name="guests" value={reservationForm.guests} onChange={handleReservationChange}>
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8 Guests</option>
                  </select>
                </label>
                <label>
                  <span>Date</span>
                  <input
                    type="date"
                    name="date"
                    value={reservationForm.date}
                    onChange={handleReservationChange}
                    required
                  />
                </label>
                <label>
                  <span>Time</span>
                  <input
                    type="time"
                    name="time"
                    value={reservationForm.time}
                    onChange={handleReservationChange}
                    required
                  />
                </label>
              </div>
              <button type="submit" className="primary-button">
                Reserve
              </button>
              {reservationMessage ? <p className="confirmation-message">{reservationMessage}</p> : null}
            </form>
          </div>
        </SplitSection>

        <SplitSection
          id="about"
          title="About"
          image="https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Chef sprinkling seasoning over a plated dish"
          eyebrow="Our philosophy"
        >
          <div className="content-panel panel reveal is-visible">
            <div className="panel-header">
              <p className="eyebrow">About Qitchen</p>
              <h2>Sushi artistry redefined</h2>
              <p className="muted-copy">
                Qitchen blends Japanese precision with cinematic plating, creating an intimate room
                where every service feels like an after-dark premiere.
              </p>
            </div>

            <div className="about-grid">
              <img
                className="landscape-card image-card"
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
                alt="Elegant restaurant interior with dark finishes"
              />
              <div className="award-grid">
                {awards.map((award) => (
                  <article key={award.value} className="award-card panel-subtle">
                    <strong>{award.value}</strong>
                    <p>{award.label}</p>
                  </article>
                ))}
              </div>
              <img
                className="story-image image-card"
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
                alt="Chefs working together in a warm kitchen"
              />
              <div className="story-card panel-subtle">
                <p className="eyebrow">Our story</p>
                <h3>Born from reverence, refined through contrast</h3>
                <p>
                  Our dining room was built around the tension between quiet luxury and raw
                  ingredient energy. The result is a restaurant that feels deeply contemporary yet
                  rooted in timeless hospitality.
                </p>
              </div>
            </div>
          </div>
        </SplitSection>

        <SplitSection
          id="contact"
          title="Contact"
          image="https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Close-up plated sushi on a dark surface"
          eyebrow="Visit us"
        >
          <div className="content-panel panel reveal is-visible">
            <div className="contact-top-grid">
              <article className="panel-subtle hours-card">
                <p className="eyebrow">Opening hours</p>
                <h2>Every night worth lingering over</h2>
                <div className="hours-list">
                  {hours.map(([day, time]) => (
                    <div key={day}>
                      <span>{day}</span>
                      <strong>{time}</strong>
                    </div>
                  ))}
                </div>
              </article>

              <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Qitchen gallery scene ${index + 1}`}
                    className="image-card"
                  />
                ))}
              </div>
            </div>

            <div className="contact-bottom-grid">
              <div className="map-card panel-subtle">
                <div className="map-glow" />
                <div className="map-pin">
                  <span />
                </div>
                <p>Hudson Square / Manhattan</p>
              </div>

              <article className="panel-subtle get-in-touch">
                <p className="eyebrow">Get in touch</p>
                <h2>Plan your next late-night table</h2>
                <div className="contact-list">
                  {contactDetails.map((detail) => (
                    <div key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="inline-socials">
                  {socialLinks.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </SplitSection>

        <SplitSection
          id="blog"
          title="Blog"
          image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80"
          imageAlt="Camera capturing a plated fine dining course"
          eyebrow="Journal"
        >
          <div className="content-panel panel reveal is-visible">
            <div className="panel-header">
              <p className="eyebrow">News & journal</p>
              <h2>Stories from the pass</h2>
              <p className="muted-copy">
                Explore chef notes, sourcing insights and the rituals shaping Qitchen after dark.
              </p>
            </div>

            <div className="blog-grid">
              <div className="post-list">
                {blogPosts.map((post) => (
                  <button
                    key={post.title}
                    type="button"
                    className={`post-card ${selectedPost.title === post.title ? 'is-selected' : ''}`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <img src={post.image} alt={post.title} className="post-thumb" />
                    <div>
                      <span className="post-date">{post.date}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </div>
                  </button>
                ))}
              </div>

              <article className="featured-post panel-subtle">
                <span className="eyebrow">Featured detail</span>
                <h2>{selectedPost.title}</h2>
                <img src={selectedPost.image} alt={selectedPost.title} className="featured-image" />
                <div className="feature-copy">
                  <h3>{selectedPost.detailTitle}</h3>
                  <p>{selectedPost.detailBody}</p>
                  <h3>{selectedPost.detailTitleTwo}</h3>
                  <p>{selectedPost.detailBodyTwo}</p>
                </div>
              </article>
            </div>
          </div>
        </SplitSection>
      </main>
    </div>
  )
}

function SplitSection({ id, title, image, imageAlt, eyebrow, children }) {
  return (
    <section id={id} className="section split-section reveal">
      <div className="split-media sticky-column panel image-panel">
        <img src={image} alt={imageAlt} />
        <div className="section-label-wrap">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-display">{title}</h2>
        </div>
      </div>
      <div className="split-content">{children}</div>
    </section>
  )
}

export default App
