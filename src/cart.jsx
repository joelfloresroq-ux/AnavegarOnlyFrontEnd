/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('tec_cart') || '[]'))
  const [lastAdded, setLastAdded] = useState(null)
  const save = (next) => { setItems(next); localStorage.setItem('tec_cart', JSON.stringify(next)) }
  const add = (product) => {
    const found = items.find((item) => item.id === product.id)
    save(found ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }])
    setLastAdded({ id: product.id, name: product.name, key: Date.now() })
  }
  useEffect(() => {
    if (!lastAdded) return undefined
    const timer = window.setTimeout(() => setLastAdded(null), 2600)
    return () => window.clearTimeout(timer)
  }, [lastAdded])
  const change = (id, quantity) => save(quantity < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity } : item))
  const clear = () => save([])
  return <CartContext.Provider value={{ items, add, change, clear, lastAdded, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) }}>{children}</CartContext.Provider>
}
export function useCart() { return useContext(CartContext) }
