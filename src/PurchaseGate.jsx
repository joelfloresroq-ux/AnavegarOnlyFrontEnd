import { useState } from 'react'
import { Link } from './router.jsx'
import { useCart } from './cart.jsx'
import './purchase-gate.css'

export function AddToCartButton({ product, className = '' }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const handleAdd = () => {
    add(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1350)
  }
  return <button className={`${className} add-to-cart-button ${added ? 'is-added' : ''}`} type="button" onClick={handleAdd} aria-live="polite"><span className="add-to-cart-icon" aria-hidden="true">{added ? '✓' : '🛒'}</span><span>{added ? '¡Agregado!' : 'Agregar al carrito'}</span><i className="cart-spark spark-one" /><i className="cart-spark spark-two" /><i className="cart-spark spark-three" /></button>
}

// En productos con varias duraciones se elige la duración en su página; en el resto se agrega directo.
export function ProductAction({ product }) {
  return product.variants ? <Link className="add-to-cart-button choose-duration" to={`/producto/${product.id}`}><span>Elegir duración</span></Link> : <AddToCartButton product={product} />
}
