import { useEffect, useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'

const timeSlots = []
for (let h = 17; h <= 22; h++) {
  for (let m = 0; m < 60; m += 30) {
    if (h === 22 && m > 30) break
    timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }
}

const initialForm = { name: '', phone: '', email: '', date: '', specialRequests: '' }

export default function ReservationPage() {
  const [form, setForm] = useState(initialForm)
  const [guests, setGuests] = useState(2)
  const [selectedTime, setSelectedTime] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Qitchen | Reservation'
  }, [])

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }))
    setErrors((prev) => ({ ...prev, [target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[+\d\s()-]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.date) errs.date = 'Date is required'
    else {
      const picked = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (picked < today) errs.date = 'Date must be today or later'
    }
    if (!selectedTime) errs.time = 'Please select a time slot'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setGuests(2)
    setSelectedTime('')
    setErrors({})
    setSubmitted(false)
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <PageTransition>
      {/* Hero */}
      <div className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
          alt="Wine glasses on a warmly lit restaurant table"
          loading="lazy"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="eyebrow">Reserve now</span>
          <h1>Reservation</h1>
        </div>
      </div>

      {/* Form */}
      <div className="reservation-page">
        <div className="panel reservation-content">
          {submitted ? (
            <div className="reservation-success">
              <div className="success-checkmark">✓</div>
              <div className="success-message">
                <h2>Reservation Confirmed</h2>
                <p>
                  Thank you, {form.name}! Your reservation for {guests} guest{guests > 1 ? 's' : ''} on{' '}
                  {form.date} at {selectedTime} has been confirmed.
                </p>
                <button type="button" className="primary-button" onClick={handleReset} style={{ maxWidth: 320 }}>
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <p className="eyebrow">Reservation</p>
                <h2 className="section-heading" style={{ margin: '0.5rem 0' }}>Curate your evening</h2>
                <p className="muted-copy">
                  Secure your seat for a moody dining ritual shaped by fire, fragrance and chef-led storytelling.
                </p>
              </div>

              <form className="reservation-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label className="form-label" htmlFor="res-name">Name</label>
                  <input
                    id="res-name"
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div className="reservation-form-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor="res-phone">Phone</label>
                    <input
                      id="res-phone"
                      className="form-input"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(000) 000-0000"
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="res-email">Email</label>
                    <input
                      id="res-email"
                      className="form-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="guest@example.com"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="reservation-form-grid">
                  <div className="form-field">
                    <span className="form-label">Guests</span>
                    <div className="guest-stepper">
                      <button
                        type="button"
                        className="guest-stepper-btn"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        disabled={guests <= 1}
                        aria-label="Decrease guests"
                      >
                        −
                      </button>
                      <span className="guest-count">{guests} Guest{guests > 1 ? 's' : ''}</span>
                      <button
                        type="button"
                        className="guest-stepper-btn"
                        onClick={() => setGuests((g) => Math.min(12, g + 1))}
                        disabled={guests >= 12}
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="res-date">Date</label>
                    <input
                      id="res-date"
                      className="form-input"
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={todayStr}
                    />
                    {errors.date && <p className="form-error">{errors.date}</p>}
                  </div>
                </div>

                <div className="form-field">
                  <span className="form-label">Time Slot</span>
                  <div className="time-slot-grid">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`time-slot${selectedTime === t ? ' time-slot-selected' : ''}`}
                        onClick={() => { setSelectedTime(t); setErrors((prev) => ({ ...prev, time: '' })) }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="form-error">{errors.time}</p>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="res-special">Special Requests (optional)</label>
                  <textarea
                    id="res-special"
                    className="form-textarea"
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    placeholder="Allergies, celebrations, seating preferences..."
                    rows={4}
                  />
                </div>

                <button type="submit" className="primary-button" id="reserve-submit">
                  Reserve Your Table
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
