import { useState } from 'react'
import { Link } from './router.jsx'
import { licenseProducts } from './catalog.js'
import { useCart } from './cart.jsx'
import { AddToCartButton } from './PurchaseGate.jsx'
import './shop.css'
import './whatsapp.css'
import './store-layout.css'

const money = (value) => `S/ ${value.toFixed(2)}`
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
function Card({ product }) { const [favorite, setFavorite] = useState(false); return <article className="shop-card">{product.oldPrice && <span className="sale">Oferta</span>}<button className={favorite ? 'favorite active' : 'favorite'} type="button" aria-label={(favorite ? 'Quitar ' : 'Guardar ') + product.name} aria-pressed={favorite} onClick={() => setFavorite(!favorite)}>{favorite ? '♥' : '♡'}</button><Link to={`/producto/${product.id}`}><img className="shop-icon" src={product.image} alt={product.name} /></Link><p>{product.brand}</p><h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3><small>{product.description}</small><ul>{product.details.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}<span className="product-availability">✓ Entrega digital</span><AddToCartButton product={product} /></article> }
const allProducts = licenseProducts
export function Store() {
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sort, setSort] = useState('recommended')
  const brands = [...new Set(allProducts.map((product) => product.brand))].sort()
  const toggle = (value, setter) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  const filteredProducts = allProducts.filter((product) => !selectedBrands.length || selectedBrands.includes(product.brand)).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0)
  const resetFilters = () => { setSelectedBrands([]); window.history.replaceState({}, '', '/tienda') }
  return <section className="store-page"><div className="store-intro compact-store-intro"><p className="eyebrow">TIENDA ANAVEGAR</p><h1>Tecnología organizada para que encuentres más rápido lo que necesitas.</h1><p>Licencias digitales originales de Office, Windows, Microsoft 365, Canva, CapCut y Gemini. Paga con Yape y recibe tu licencia por WhatsApp.</p></div><div className="store-catalog-layout"><aside className="store-filters"><div className="filter-title"><h2>Filtrar productos</h2><button type="button" onClick={resetFilters}>Limpiar</button></div><details open><summary>Marca</summary>{brands.map((brand) => <label key={brand}><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, setSelectedBrands)} /> {brand}</label>)}</details></aside><div className="store-results"><div className="store-toolbar"><div><p className="eyebrow">CATÁLOGO</p><h2>{filteredProducts.length} productos encontrados</h2></div><label>Ordenar por<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recomendados</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A–Z</option></select></label></div>{filteredProducts.length ? <div className="shop-grid catalog-grid">{filteredProducts.map((product) => <Card key={product.id} product={product} />)}</div> : <div className="no-products"><h3>No encontramos productos con esos filtros.</h3><p>Prueba retirando alguna categoría o marca.</p><button className="button" type="button" onClick={resetFilters}>Ver todo el catálogo</button></div>}</div></div></section> }
const yapeSprite = (x, y, w, h) => ({ backgroundImage: 'url(/payments/yape-qr.webp)', backgroundRepeat: 'no-repeat', backgroundSize: `${(1131 / w) * 100}% auto`, backgroundPosition: `${(x / (1131 - w)) * 100}% ${(y / (1599 - h)) * 100}%`, aspectRatio: `${w} / ${h}` })
function YapePayment({ total }) {
  return <section className="yape-payment" aria-label="Opción de pago con Yape">
    <div className="yape-head"><span className="yape-logo" role="img" aria-label="Yape" style={yapeSprite(470, 100, 190, 190)} /><div><b>Opción de pago</b><small>Paga por adelantado con Yape</small></div></div>
    <div className="yape-qr" role="img" aria-label="Código QR de Yape de Ivan Ronaldo Flores Roque" style={yapeSprite(240, 422, 650, 650)} />
    <p className="yape-owner">Yape a nombre de <b>Ivan Ronaldo Flores Roque</b></p>
    <p className="yape-amount">Monto a pagar: <b>{money(total)}</b></p>
    <ol className="yape-steps"><li>Escanea el QR con tu app Yape y paga el total.</li><li>Toca “Enviar pedido por WhatsApp” y adjunta tu comprobante.</li><li>Confirmamos tu pago y te entregamos tu licencia.</li></ol>
  </section>
}
export function Cart() { const { items, change, total } = useCart(); return <section className="checkout-page"><p className="eyebrow">CARRITO DE COMPRAS</p><h1>Tu carrito</h1>{items.length === 0 ? <div className="empty-cart"><p>Aún no agregaste productos.</p><Link className="button" to="/tienda">Ir a la tienda</Link></div> : <div className="cart-layout"><div>{items.map((item) => <article className="cart-row" key={item.id}><img className="cart-icon" src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.brand}</p><strong>{money(item.price)}</strong></div><div className="quantity"><button onClick={() => change(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => change(item.id, item.quantity + 1)}>+</button></div><b>{money(item.price * item.quantity)}</b></article>)}</div><aside className="order-summary"><h2>Resumen</h2><p><span>Subtotal</span><b>{money(total)}</b></p><p><span>Envío</span><b>Por calcular</b></p><hr/><h3>Total: {money(total)}</h3><Link className="button" to="/checkout">Enviar pedido por WhatsApp</Link><YapePayment total={total} /></aside></div>}</section> }
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
    const text = `Hola, quiero realizar este pedido en Anavegar Soluciones:\n\n${orderLines}\n\nTotal referencial: ${money(total)}\n\nNombre: ${customer?.name || 'Por indicar'}\nCorreo: ${customer?.email || 'Por indicar'}\nCelular: ${customer?.phone || 'Por indicar'}\n\nPagaré (o ya pagué) por Yape. Les enviaré el comprobante por este chat para recibir mi licencia.`
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
  return <section className="checkout-page"><p className="eyebrow">PEDIDO POR WHATSAPP</p><h1>Confirma tu solicitud</h1><div className="checkout-box"><div><h2>Total referencial: {money(total)}</h2><p>Envía tu carrito al chat de Anavegar Soluciones. Si ya pagaste con Yape (QR en el carrito), adjunta tu comprobante en el chat y te entregaremos tu licencia.</p><p className="payment-note">No solicitamos ni procesamos datos de tarjetas en esta web.</p></div>{collectingData ? <form className="checkout-contact-form" onSubmit={submitGuest}><h3>Datos para tu pedido</h3><p>Completa estos datos una vez; quedarán guardados solo en este navegador para tus próximos pedidos.</p><label>Nombre completo<input required value={guestForm.name} onChange={(event) => setGuestForm({ ...guestForm, name: event.target.value })} /></label><label>Correo electrónico<input required type="email" value={guestForm.email} onChange={(event) => setGuestForm({ ...guestForm, email: event.target.value })} /></label><label>Celular / WhatsApp<input required inputMode="tel" value={guestForm.phone} onChange={(event) => setGuestForm({ ...guestForm, phone: event.target.value })} /></label><button className="button whatsapp-button" type="submit">💬 Continuar por WhatsApp</button></form> : <button className="button whatsapp-button" disabled={!items.length} onClick={beginCheckout}>💬 Enviar pedido por WhatsApp</button>}{message && <p className="checkout-message">{message}</p>}</div></section>
}
