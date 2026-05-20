import { useEffect, useMemo, useState } from 'react'
import { menuCategories, menuItems } from '../data/menuData.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../components/Toast.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Cart from '../components/Cart.jsx'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0])
  const [cartOpen, setCartOpen] = useState(false)
  const { dispatch, totalItems } = useCart()
  const toast = useToast()

  useEffect(() => {
    document.title = 'Qitchen | Menu'
  }, [])

  const filtered = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const handleAdd = (item) => {
    dispatch({ type: 'ADD_ITEM', item })
    toast(`${item.title} added to cart!`, 'success')
  }

  return (
    <PageTransition>
      {/* Hero */}
      <div className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80"
          alt="Chef holding a dark bowl with plated food"
          loading="lazy"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="eyebrow">Curated rolls</span>
          <h1>Our Menu</h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="menu-filter">
        <div className="pill-row" role="tablist" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill-button${activeCategory === cat ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="section-ornament">
          <span />
          <strong>{activeCategory}</strong>
          <span />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="menu-page-grid">
        {filtered.map((item) => (
          <article key={item.id} className="menu-card">
            <div style={{ overflow: 'hidden' }}>
              <img className="menu-card-img" src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="menu-card-body">
              <h3 className="menu-card-title">{item.title}</h3>
              <p className="menu-card-desc">{item.description}</p>
              <div className="menu-card-footer">
                <span className="menu-card-price">${item.price}</span>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => handleAdd(item)}
                  id={`add-${item.id}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          type="button"
          className="floating-cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          id="floating-cart"
        >
          🛒
          <span className="floating-cart-count">{totalItems}</span>
        </button>
      )}

      {/* Cart Drawer */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </PageTransition>
  )
}
