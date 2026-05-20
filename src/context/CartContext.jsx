import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem('qitchen_cart')
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    localStorage.setItem('qitchen_cart', JSON.stringify(state))
  }, [state])

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ ...state, totalItems, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
