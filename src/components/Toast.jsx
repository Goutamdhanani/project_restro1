import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    )
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 320)
  }, [])

  const addToast = useCallback(
    (message, variant = 'info') => {
      const id = ++toastId
      setToasts((prev) => [...prev, { id, message, variant, exiting: false }])
      timers.current[id] = setTimeout(() => removeToast(id), 3000)
      return id
    },
    [removeToast]
  )

  const handleClose = useCallback(
    (id) => {
      clearTimeout(timers.current[id])
      delete timers.current[id]
      removeToast(id)
    },
    [removeToast]
  )

  useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearTimeout)
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {createPortal(
        <div className="toast-container" aria-live="polite">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`toast toast-${t.variant}${t.exiting ? ' toast-exit' : ''}`}
              role="alert"
            >
              <span>{t.message}</span>
              <button
                className="toast-close"
                onClick={() => handleClose(t.id)}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
