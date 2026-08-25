import { useEffect, useMemo, useState } from 'react'
import { Link } from './router.jsx'
import { licenseProducts, accessoryCategories, accessoryProducts } from './catalog.js'
import { useCart } from './cart.jsx'
import { AddToCartButton } from './PurchaseGate.jsx'
import './shop.css'
import './whatsapp.css'
import './store-layout.css'

const money = (value) => `S/ ${value.toFixed(2)}`
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
function Card({ product }) { const [favorite, setFavorite] = useState(false); return <article className="shop-card">{product.oldPrice && <span className="sale">Oferta</span>}<button className={favorite ? 'favorite active' : 'favorite'} type="button" aria-label={(favorite ? 'Quitar ' : 'Guardar ') + product.name} aria-pressed={favorite} onClick={() => setFavorite(!favorite)}>{favorite ? '♥' : '♡'}</button><Link to={`/producto/${product.id}`}><img className="shop-icon" src={product.image} alt={product.name} /></Link><p>{product.brand}</p><h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3><small>{product.description}</small><ul>{product.details.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}<span className="product-availability">✓ Disponible para pedido</span><AddToCartButton product={product} /></article> }
const allProducts = [...licenseProducts, ...accessoryProducts]
const typeFromHash = () => window.location.hash === '#licencias' ? 'licenses' : window.location.hash ? 'accessories' : 'all'
const groupFromHash = () => accessoryCategories.some((category) => '#' + category.id === window.location.hash) ? [window.location.hash.slice(1)] : []
export function Store() {
  const [productType, setProductType] = useState(typeFromHash)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedGroups, setSelectedGroups] = useState(groupFromHash)
  const [sort, setSort] = useState('recommended')
  const brands = [...new Set(allProducts.map((product) => product.brand))].sort()
  useEffect(() => {
    const syncHash = () => { setProductType(typeFromHash()); setSelectedGroups(groupFromHash()) }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])
  const toggle = (value, setter) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  const filteredProducts = useMemo(() => {
    const result = allProducts.filter((product) => {
      const isLicense = product.type === 'license'
      if (productType === 'licenses' && !isLicense) return false
      if (productType === 'accessories' && isLicense) return false
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false
      if (selectedGroups.length && (!product.subCategory || !selectedGroups.includes(product.subCategory))) return false
      return true
    })
    return result.sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0)
  }, [productType, selectedBrands, selectedGroups, sort])
  const resetFilters = () => { setProductType('all'); setSelectedBrands([]); setSelectedGroups([]); window.history.replaceState({}, '', '/tienda') }
  return <section className="store-page"><div className="store-intro compact-store-intro"><p className="eyebrow">TIENDA ANAVEGAR</p><h1>Tecnología organizada para que encuentres más rápido lo que necesitas.</h1><p>Filtra por tipo, marca y categoría. Seguiremos añadiendo productos a cada sección.</p></div><div className="store-catalog-layout"><aside className="store-filters"><div className="filter-title"><h2>Filtrar productos</h2><button type="button" onClick={resetFilters}>Limpiar</button></div><details open><summary>Tipo de producto</summary><label><input type="radio" name="product-type" checked={productType === 'all'} onChange={() => setProductType('all')} /> Todos los productos</label><label><input type="radio" name="product-type" checked={productType === 'licenses'} onChange={() => setProductType('licenses')} /> Licencias y software</label><label><input type="radio" name="product-type" checked={productType === 'accessories'} onChange={() => setProductType('accessories')} /> Productos físicos</label></details><details open><summary>Categoría de productos</summary>{accessoryCategories.map((category) => <label key={category.id}><input type="checkbox" checked={selectedGroups.includes(category.id)} onChange={() => toggle(category.id, setSelectedGroups)} /> {category.label}</label>)}</details><details open><summary>Marca</summary>{brands.map((brand) => <label key={brand}><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, setSelectedBrands)} /> {brand}</label>)}</details></aside><div className="store-results"><div className="store-toolbar"><div><p className="eyebrow">CATÁLOGO</p><h2>{filteredProducts.length} productos encontrados</h2></div><label>Ordenar por<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recomendados</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A–Z</option></select></label></div>{filteredProducts.length ? <div className="shop-grid catalog-grid">{filteredProducts.map((product) => <Card key={product.id} product={product} />)}</div> : <div className="no-products"><h3>No encontramos productos con esos filtros.</h3><p>Prueba retirando alguna categoría o marca.</p><button className="button" type="button" onClick={resetFilters}>Ver todo el catálogo</button></div>}</div></div></section> }
export function Cart() { const { items, change, total } = useCart(); return <section className="checkout-page"><p className="eyebrow">CARRITO DE COMPRAS</p><h1>Tu carrito</h1>{items.length === 0 ? <div className="empty-cart"><p>Aún no agregaste productos.</p><Link className="button" to="/tienda">Ir a la tienda</Link></div> : <div className="cart-layout"><div>{items.map((item) => <article className="cart-row" key={item.id}><img className="cart-icon" src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.brand}</p><strong>{money(item.price)}</strong></div><div className="quantity"><button onClick={() => change(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => change(item.id, item.quantity + 1)}>+</button></div><b>{money(item.price * item.quantity)}</b></article>)}</div><aside className="order-summary"><h2>Resumen</h2><p><span>Subtotal</span><b>{money(total)}</b></p><p><span>Envío</span><b>Por calcular</b></p><hr/><h3>Total: {money(total)}</h3><Link className="button" to="/checkout">Enviar pedido por WhatsApp</Link></aside></div>}</section> }
export function Checkout() {
  const { items, total } = useCart()
  const [message, setMessage] = useState('')
  const [collectingData, setCollectingData] = useState(false)
  const [guestForm, setGuestForm] = useState(() => JSON.parse(localStorage.getItem('tec_guest_customer') || 'null') || { name: '', email: '', phone: '' })
  const savedGuest = JSON.parse(localStorage.getItem('tec_guest_customer') || 'null')
  const sendToWhatsApp = (customer) => {
    if (!whatsappNumber) return setMessage('Falta configurar el número de WhatsApp de la tienda.')
    if (!items.length) return setMessage('Agrega al menos un producto antes de enviar tu pedido.')
    const orderLines = items.map((item) => `• ${item.quantity} x ${item.name} — ${money(item.price * item.quantity)}`).join('\n')
    const text = `Hola, quiero realizar este pedido en Anavegar Soluciones:\n\n${orderLines}\n\nTotal referencial: ${money(total)}\n\nNombre: ${customer?.name || 'Por indicar'}\nCorreo: ${customer?.email || 'Por indicar'}\nCelular: ${customer?.phone || 'Por indicar'}\n\nPor favor, confírmenme disponibilidad, envío y forma de pago.`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setMessage('Abrimos WhatsApp con el detalle de tu pedido. El carrito se conserva hasta que confirmes la compra.')
  }
  const beginCheckout = () => {
    if (!items.length) return setMessage('Agrega al menos un producto antes de enviar tu pedido.')
    if (savedGuest) return sendToWhatsApp(savedGuest)
    setCollectingData(true)
  }
  const submitGuest = (event) => {
    event.preventDefault()
    localStorage.setItem('tec_guest_customer', JSON.stringify(guestForm))
    sendToWhatsApp(guestForm)
  }
  return <section className="checkout-page"><p className="eyebrow">PEDIDO POR WHATSAPP</p><h1>Confirma tu solicitud</h1><div className="checkout-box"><div><h2>Total referencial: {money(total)}</h2><p>Envía tu carrito al chat de Anavegar Soluciones. Allí confirmaremos la disponibilidad, costo de envío y forma de pago antes de concretar la compra.</p><p className="payment-note">No solicitamos ni procesamos datos de tarjetas en esta web.</p></div>{collectingData ? <form className="checkout-contact-form" onSubmit={submitGuest}><h3>Datos para tu pedido</h3><p>Completa estos datos una vez; quedarán guardados solo en este navegador para tus próximos pedidos.</p><label>Nombre completo<input required value={guestForm.name} onChange={(event) => setGuestForm({ ...guestForm, name: event.target.value })} /></label><label>Correo electrónico<input required type="email" value={guestForm.email} onChange={(event) => setGuestForm({ ...guestForm, email: event.target.value })} /></label><label>Celular / WhatsApp<input required inputMode="tel" value={guestForm.phone} onChange={(event) => setGuestForm({ ...guestForm, phone: event.target.value })} /></label><button className="button whatsapp-button" type="submit">💬 Continuar por WhatsApp</button></form> : <button className="button whatsapp-button" disabled={!items.length} onClick={beginCheckout}>💬 Enviar pedido por WhatsApp</button>}{message && <p className="checkout-message">{message}</p>}</div></section>
}
