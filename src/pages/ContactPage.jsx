import { useEffect, useState } from 'react'
import { contactDetails, hours, socialLinks, galleryImages } from '../data/menuData.js'
import { useToast } from '../components/Toast.jsx'
import PageTransition from '../components/PageTransition.jsx'

const dayMap = ['Sun', 'Mon — Thu', 'Mon — Thu', 'Mon — Thu', 'Mon — Thu', 'Fri — Sat', 'Fri — Sat']

const subjects = ['General Inquiry', 'Reservation Question', 'Private Events', 'Feedback']

export default function ContactPage() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })
  const [errors, setErrors] = useState({})
  const currentDay = dayMap[new Date().getDay()]

  useEffect(() => {
    document.title = 'Qitchen | Contact'
  }, [])

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }))
    setErrors((prev) => ({ ...prev, [target.name]: '' }))
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast('Copied to clipboard!', 'success')
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      toast("Message sent! We'll get back to you soon.", 'success')
      setForm({ name: '', email: '', subject: subjects[0], message: '' })
    }
  }

  return (
    <PageTransition>
      {/* Hero */}
      <div className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=1400&q=80"
          alt="Close-up plated sushi on a dark surface"
          loading="lazy"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="eyebrow">Visit us</span>
          <h1>Contact</h1>
        </div>
      </div>

      {/* Info Grid */}
      <div className="contact-grid">
        {/* Hours */}
        <article className="hours-card">
          <h2>Opening Hours</h2>
          <div className="hours-list">
            {hours.map(([day, time]) => (
              <div key={day} className={day === currentDay ? 'hours-current' : ''}>
                <span className={day === currentDay ? 'hours-current' : ''}>{day}</span>
                <strong className={day === currentDay ? 'hours-current' : ''}>{time}</strong>
              </div>
            ))}
          </div>
        </article>

        {/* Gallery */}
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <img
              key={img}
              className="gallery-img"
              src={img}
              alt={`Qitchen gallery scene ${idx + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Map + Contact Info */}
      <div className="contact-grid">
        <div className="map-card">
          <iframe
            className="map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.953!2d-74.0065!3d40.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzMzLjAiTiA3NMKwMDAnMjMuNCJX!5e0!3m2!1sen!2sus!4v1"
            title="Qitchen location"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <article className="get-in-touch">
          <h2>Get in Touch</h2>
          <div className="contact-list">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <span>{detail.label}</span>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => handleCopy(detail.value)}
                  title="Click to copy"
                >
                  {detail.value}
                </button>
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

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2 className="section-heading">Send us a message</h2>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-row">
            <div className="form-field">
              <label className="form-label" htmlFor="contact-name">Name</label>
              <input id="contact-name" className="form-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input id="contact-email" className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-subject">Subject</label>
            <select id="contact-subject" className="form-select" name="subject" value={form.subject} onChange={handleChange}>
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="How can we help?" rows={5} />
            {errors.message && <p className="form-error">{errors.message}</p>}
          </div>

          <button type="submit" className="primary-button" id="contact-submit">Send Message</button>
        </form>
      </section>
    </PageTransition>
  )
}
