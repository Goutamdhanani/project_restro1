import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Cart({ isOpen, onClose }) {
  const { items, totalPrice, dispatch } = useCart()
  const [confirmed, setConfirmed] = useState(false)

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleCheckout = () => {
    setConfirmed(true)
    dispatch({ type: 'CLEAR' })
  }

  const handleCloseModal = () => {
    setConfirmed(false)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? ' cart-drawer-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${isOpen ? ' cart-drawer-open' : ''}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal={isOpen}
      >
        {/* Header */}
        <div className="cart-header">
          <h2>Your Order</h2>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
            type="button"
          >
            ✕
          </button>
        </div>

        {items.length === 0 && !confirmed ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <span>Explore our menu to add exquisite dishes.</span>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    className="cart-item-img"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="cart-item-info">
                    <strong>{item.title}</strong>
                    <span>${item.price}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QTY',
                          id: item.id,
                          qty: item.qty - 1,
                        })
                      }
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QTY',
                          id: item.id,
                          qty: item.qty + 1,
                        })
                      }
                      aria-label="Increase quantity"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() =>
                      dispatch({ type: 'REMOVE_ITEM', id: item.id })
                    }
                    aria-label={`Remove ${item.title}`}
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <button
              className="cart-checkout-btn primary-button"
              onClick={handleCheckout}
              disabled={items.length === 0}
              type="button"
            >
              Checkout
            </button>

            <button
              className="cart-clear"
              onClick={() => dispatch({ type: 'CLEAR' })}
              type="button"
            >
              Clear Cart
            </button>
          </>
        )}
      </aside>

      {/* Checkout Confirmation Modal */}
      {confirmed && (
        <div className="checkout-modal" onClick={handleCloseModal}>
          <div
            className="checkout-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="checkout-icon">✓</div>
            <h3>Order Confirmed!</h3>
            <p>Your sushi is being prepared.</p>
            <button
              className="primary-button"
              onClick={handleCloseModal}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
