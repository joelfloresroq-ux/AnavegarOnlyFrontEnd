import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, usePath } from './router.jsx'
import { Store, Cart, Checkout } from './Shop.jsx'
import { CartProvider, useCart } from './cart.jsx'
const anavegarLogo = '/brand/anavegar-logo-transparent.png'
import { licenseProducts, accessoryCategories, accessoryProducts } from './catalog.js'
import ProductDetail from './ProductDetail.jsx'
import './App.css'
import './session.css'

const services = [
  { icon: '▰', image: '/services/reparacion-laptops.jpg', title: 'Reparación de laptops', text: 'Pantallas, batería, teclado, software y optimización.' },
  { icon: '▦', image: '/services/reparacion-pc.png', title: 'Computadoras y PC', text: 'Mantenimiento, armado y mejora de componentes.' },
  { icon: '▤', image: '/services/reparacion-impresoras.jpg', title: 'Servicio de impresoras', text: 'Limpieza, configuración y solución de fallas.' },
]
const socialIcons = [
  { name: 'TikTok', className: 'tiktok' },
  { name: 'Facebook', className: 'facebook', href: 'https://www.facebook.com/anavegarsoltec/' },
  { name: 'Instagram', className: 'instagram' },
  { name: 'X / Twitter', className: 'twitter' },
]
const serviceBrands = ['Epson', 'Canon', 'Brother', 'HP', 'Acer', 'Lenovo', 'AMD', 'Intel', 'NVIDIA']

function SocialLogo({ brand }) {
  if (brand === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.3l.7-4H13V9c0-.7.3-1 1-1Z" /></svg>
  if (brand === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r="1" /></svg>
  if (brand === 'twitter') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.7L23 22h-6.1l-4.8-6.2L6.7 22H3.6l7.3-8.3L3.4 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L8.7 3.9H6.9L17.8 20Z" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3c.3 2.1 1.5 3.8 3.7 4.2v3.1c-1.3 0-2.5-.4-3.6-1.1v6.5a5.2 5.2 0 1 1-4.5-5.2v3.1a2.2 2.2 0 1 0 1.4 2.1V3h3Z" /></svg>
}

function WhatsAppLogo() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.5 11.5 0 0 0 2.8 17.3L2 22l4.8-1.2A11.5 11.5 0 1 0 20.5 3.5Zm-8.5 16a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8.1 8.1 0 1 1 12 19.5Zm4.4-5.9c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.4 1.7.5.7.2 1.4.1 1.9.1.6-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z" /></svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('tec_theme') === 'dark')
  const { count, lastAdded } = useCart()
  const results = query.trim() ? [...licenseProducts, ...accessoryProducts].filter((product) => `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : []
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('tec_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])
  return <>
    <header className="header">
      <Link className="brand-logo" to="/"><img src={anavegarLogo} alt="Anavegar Soluciones" /></Link>
      <div className="search"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca accesorios, licencias y más..." aria-label="Buscar productos" /><button aria-label="Buscar">⌕</button>{results.length > 0 && <div className="search-results">{results.map((product) => <Link key={product.id} to={`/producto/${product.id}`} onClick={() => setQuery('')}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.brand} · S/ {product.price.toFixed(2)}</small></span></Link>)}</div>}{query.trim() && results.length === 0 && <div className="search-results empty-result">No encontramos productos para “{query}”.</div>}</div>
      <div className="header-actions"><button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Activar tema claro' : 'Activar tema oscuro'} title={darkMode ? 'Tema claro' : 'Tema oscuro'}>{darkMode ? '☀' : '☾'}</button><Link key={lastAdded?.key || 'cart'} className={lastAdded ? 'cart-link cart-link-bump' : 'cart-link'} to="/carrito">🛒 <b>Carrito ({count})</b></Link></div>
      <button className="theme-toggle mobile-theme" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Activar tema claro' : 'Activar tema oscuro'}>{darkMode ? '☀' : '☾'}</button>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Abrir menú">☰</button>
    </header>
    <nav className={open ? 'main-nav open' : 'main-nav'}>
      <div className="categories-menu" tabIndex="0">
        <span className="category-link">☰ Categorías</span>
        <div className="mega-menu">
          <section>
            <p>LICENCIAS Y SOFTWARE</p>
            <Link className="mega-view-all" to="/tienda#licencias">Ver todas las licencias →</Link>
            <Link to="/tienda#licencias">Microsoft 365 y Office</Link>
            <Link to="/tienda#licencias">Windows</Link>
            <Link to="/tienda#licencias">Autodesk</Link>
            <Link to="/tienda#licencias">Antivirus y seguridad</Link>
          </section>
          <section>
            <p>PRODUCTOS FÍSICOS</p>
            <Link className="mega-view-all" to="/tienda#accesorios">Ver todos los productos →</Link>
            {accessoryCategories.map((category) => <Link key={category.id} to={`/tienda#${category.id}`}>{category.label}</Link>)}
          </section>
          <aside className="mega-support">
            <span>Servicio técnico</span><strong>¿Tu equipo necesita ayuda?</strong><p>Reparamos laptops, computadoras e impresoras.</p>
            <Link to="/soporte">Solicitar soporte →</Link>
          </aside>
        </div>
      </div>
      <div className="mobile-category-shortcuts" aria-label="Categorías destacadas">
        <p>Explora por categoría</p>
        <div>
          <Link to="/tienda#licencias" onClick={() => setOpen(false)}><i>▣</i> Licencias</Link>
          <Link to="/tienda#teclados" onClick={() => setOpen(false)}><i>⌨</i> Teclados</Link>
          <Link to="/tienda#mouse" onClick={() => setOpen(false)}><i>◉</i> Mouse</Link>
          <Link to="/tienda#audio" onClick={() => setOpen(false)}><i>◖</i> Audífonos</Link>
          <Link to="/tienda#impresoras" onClick={() => setOpen(false)}><i>▤</i> Impresoras</Link>
          <Link to="/tienda#cables-conectividad" onClick={() => setOpen(false)}><i>⌁</i> Cables y conexión</Link>
        </div>
      </div>
      <NavLink end to="/" onClick={() => setOpen(false)}>Inicio</NavLink><NavLink to="/tienda" onClick={() => setOpen(false)}>Tienda</NavLink><NavLink to="/servicios" onClick={() => setOpen(false)}>Servicio técnico</NavLink><NavLink to="/soporte" onClick={() => setOpen(false)}>Ayuda al cliente</NavLink>
    </nav>
  </>
}


/* Legacy duplicate cart variant retained only as a reference for the original project.
function StoreWithFloatingCart() {
  const { count, total, lastAdded } = useCart()
  const [awayFromHeader, setAwayFromHeader] = useState(false)
  useEffect(() => {
    const cartLink = document.querySelector('.cart-link')
    if (!cartLink) return undefined
    const observer = new IntersectionObserver(([entry]) => setAwayFromHeader(!entry.isIntersecting), { threshold: 0.9 })
    observer.observe(cartLink)
    return () => observer.disconnect()
  }, [])
  return <><Store />{count > 0 && awayFromHeader && <Link key={lastAdded?.key || 'floating-cart'} className={lastAdded ? 'floating-cart floating-cart-bubble floating-cart-bump' : 'floating-cart floating-cart-bubble'} to="/carrito" aria-label={`Ver carrito: ${count} productos, total S/ ${total.toFixed(2)}`}><span className="floating-cart-icon" aria-hidden="true">🛒</span><span><small>Tu carrito</small><b>{count} {count === 1 ? 'producto' : 'productos'} · S/ {total.toFixed(2)}</b></span><i aria-hidden="true">→</i></Link>}</>
}
*/
function FloatingCartBubble({ path }) {
  const { count, total, lastAdded } = useCart()
  const [awayFromHeader, setAwayFromHeader] = useState(false)
  useEffect(() => {
    const cartLink = document.querySelector('.cart-link')
    if (!cartLink) return undefined
    const observer = new IntersectionObserver(([entry]) => setAwayFromHeader(!entry.isIntersecting), { threshold: 0.9 })
    observer.observe(cartLink)
    return () => observer.disconnect()
  }, [])
  if (!awayFromHeader || count === 0 || ['/carrito', '/checkout'].includes(path)) return null
  return <Link key={lastAdded?.key || 'global-floating-cart'} className={lastAdded ? 'floating-cart floating-cart-bubble floating-cart-bump' : 'floating-cart floating-cart-bubble'} to="/carrito" aria-label={`Ver carrito: ${count} productos, total S/ ${total.toFixed(2)}`}><span className="floating-cart-icon" aria-hidden="true">🛒</span><span><small>Tu carrito</small><b>{count} {count === 1 ? 'producto' : 'productos'} · S/ {total.toFixed(2)}</b></span><i aria-hidden="true">→</i></Link>
}
function SectionTitle({ eyebrow, title, text }) { return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div> }

const showcaseProducts = [...licenseProducts, ...accessoryProducts]
function ProductShowcase() {
  const loopedProducts = [...showcaseProducts, ...showcaseProducts]
  return <section className="product-showcase" aria-label="Productos en exhibición"><div className="product-showcase-heading"><span>EXPLORA EL CATÁLOGO</span><p>Desliza o pasa el cursor sobre un producto para revisarlo.</p></div><div className="product-showcase-viewport"><div className="product-showcase-track">{loopedProducts.map((product, index) => <Link className="showcase-product" key={`${product.id}-${index}`} to={`/producto/${product.id}`} tabIndex={index >= showcaseProducts.length ? -1 : undefined}><img src={product.image} alt={index < showcaseProducts.length ? product.name : ''} /><span>{product.brand}</span><b>{product.name}</b><strong>S/ {product.price.toFixed(2)}</strong></Link>)}</div></div></section>
}

const heroSlides = [
  { eyebrow: 'OFERTAS TEC+', title: 'Potencia tu día<br />con tecnología.', copy: 'Accesorios y componentes para hacer más en cada jornada.', image: '/hero/potencia-tecnologia.png', action: '/tienda', label: 'Ver ofertas' },
  { eyebrow: 'LICENCIAS DIGITALES', title: 'Software original<br />para cada proyecto.', copy: 'Office, Windows, Autodesk y seguridad para tu equipo.', image: '/hero/software-original.png', action: '/tienda', label: 'Ver licencias' },
  { eyebrow: 'SERVICIO TÉCNICO', title: 'Tu equipo en<br />buenas manos.', copy: 'Diagnóstico y reparación para laptops, computadoras e impresoras.', image: '/hero/servicio-tecnico.png', action: '/soporte', label: 'Solicitar servicio' },
]

function HeroSlider() {
  const [active, setActive] = useState(0)
  useEffect(() => { const interval = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 5500); return () => window.clearInterval(interval) }, [])
  const slide = heroSlides[active]
  return <section className="store-hero hero-slider"><div className="hero-content hero-fade" key={slide.title}><p className="eyebrow">{slide.eyebrow}</p><h1 dangerouslySetInnerHTML={{ __html: slide.title.replace('<br />', '<br />') }} /><p>{slide.copy}</p><div><Link className="button green" to={slide.action}>{slide.label}</Link><Link className="button hero-outline" to="/soporte">Solicitar servicio</Link></div></div><div className="hero-slide-image"><img src={slide.image} alt="Tecnología Anavegar" /><span className="hero-glow" /></div><div className="slider-controls"><button onClick={() => setActive((active + heroSlides.length - 1) % heroSlides.length)} aria-label="Oferta anterior">←</button>{heroSlides.map((item, index) => <button className={index === active ? 'slider-dot active' : 'slider-dot'} key={item.eyebrow} onClick={() => setActive(index)} aria-label={`Ver ${item.eyebrow}`} />)}<button onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Oferta siguiente">→</button></div></section>
}

function Home() { return <>
  <HeroSlider />
  <section className="quick-categories"><Link to="/tienda"><i>⌨</i><span>Accesorios</span><small>Para tu setup</small></Link><Link to="/tienda"><i>▣</i><span>Componentes</span><small>Mejora tu PC</small></Link><Link to="/servicios"><i>▰</i><span>Servicio técnico</span><small>Reparamos tu equipo</small></Link><Link to="/soporte"><i>☏</i><span>Soporte</span><small>Estamos para ayudarte</small></Link></section>
  <SectionTitle eyebrow="NOVEDADES TEC+" title="Productos y soluciones destacadas" text="Encuentra tecnología seleccionada y atención experta." />
  <ProductShowcase />
  <section className="offer"><div><p className="eyebrow">SERVICIO TÉCNICO ESPECIALIZADO</p><h2>¿Tu computadora va lenta<br />o dejó de funcionar?</h2><p>La revisamos, diagnosticamos y dejamos lista para que vuelvas a trabajar sin interrupciones.</p><Link className="button green" to="/soporte">Agendar diagnóstico</Link></div><div className="offer-art"><span>⚙</span><b>REPARACIÓN<br />CON GARANTÍA</b></div></section>
  <SectionTitle eyebrow="SOPORTE MULTIMARCA" title="Compras y soporte con confianza" text="Trabajamos con equipos, componentes y periféricos de las principales marcas." />
  <section className="benefits"><article><i>✓</i><h3>Garantía real</h3><p>Productos y reparaciones respaldadas.</p></article><article><i>⚡</i><h3>Atención rápida</h3><p>Respuesta clara y seguimiento a tu caso.</p></article><article><i>▣</i><h3>Compra segura</h3><p>Compra con confianza y comprobante.</p></article><article><i>☏</i><h3>Soporte cercano</h3><p>Te orientamos antes y después de comprar.</p></article></section>
  <p className="brands-caption">Marcas que atendemos en servicio técnico</p>
  <section className="service-brands" aria-label="Marcas atendidas por Anavegar Soluciones">{serviceBrands.map((brand) => <article key={brand}><img src={`/brands/${brand.toLowerCase()}.svg`} alt={brand} /></article>)}</section>
</> }
function Services() { return <><SectionTitle eyebrow="SERVICIO TÉCNICO" title="Recuperamos tu tecnología" text="Diagnóstico honesto, soluciones duraderas y comunicación clara." /><section className="service-grid services-page">{services.map(s => <article className="service-card" key={s.title}><div className="service-card-image"><img src={s.image} alt={'Servicio de ' + s.title.toLowerCase()} /></div><i>{s.icon}</i><h3>{s.title}</h3><p>{s.text}</p><ul><li>Diagnóstico técnico</li><li>Garantía de servicio</li><li>Atención personalizada</li></ul><Link to="/soporte">Solicitar atención →</Link></article>)}</section></> }

function SupportWhatsApp() {
  const [form, setForm] = useState({ name: '', phone: '', equipment: 'Laptop', brand: '', model: '', issue: '', details: '' })
  const [message, setMessage] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
    if (!number) return setMessage('Configura VITE_WHATSAPP_NUMBER en tu archivo .env para activar WhatsApp.')
    const text = `Hola, deseo solicitar servicio técnico.\n\nNombre: ${form.name}\nWhatsApp: ${form.phone}\nEquipo: ${form.equipment}\nMarca / modelo: ${[form.brand, form.model].filter(Boolean).join(' / ') || 'No indicado'}\nProblema: ${form.issue}\nDetalles: ${form.details || 'No indicó detalles adicionales'}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setMessage('Abrimos WhatsApp con los datos de tu solicitud. Te responderemos por ese medio.')
  }
  return <section className="support support-guided"><div className="support-copy"><p className="eyebrow">SOPORTE TÉCNICO</p><h1>Cuéntanos qué necesita tu equipo.</h1><p className="lead">Completa lo esencial y te conectaremos directamente por WhatsApp. No necesitas crear una cuenta.</p><ol className="support-steps"><li><b>1</b> Indica el equipo</li><li><b>2</b> Describe la falla</li><li><b>3</b> Escríbenos por WhatsApp</li></ol><div className="contact-card"><b>Horario de atención</b><span>Lunes a sábado · 9:00 a.m. – 6:00 p.m.</span></div></div><form className="form support-form" onSubmit={submit}><div className="form-section"><span className="form-step">1</span><div><h2>Datos de contacto</h2><p>Los usaremos para responder a tu consulta.</p></div><div className="contact-fields"><label>Nombre completo<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Tu nombre" /></label><label>Teléfono o WhatsApp<input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Ej. 999 999 999" /></label></div></div><div className="form-section"><span className="form-step">2</span><div><h2>Tu equipo y la falla</h2><p>Con esta información podremos orientarte mejor.</p></div><div className="contact-fields"><label>Tipo de equipo<select value={form.equipment} onChange={(event) => setForm({ ...form, equipment: event.target.value })}><option>Laptop</option><option>Computadora / PC</option><option>Impresora</option></select></label><label>Marca <span>(opcional)</span><input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} placeholder="Ej. Epson, Lenovo o HP" /></label><label>Modelo <span>(opcional)</span><input value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} placeholder="Ej. EcoTank L3250" /></label><label>Falla principal<input required value={form.issue} onChange={(event) => setForm({ ...form, issue: event.target.value })} placeholder="Ej. No enciende, imprime con líneas" /></label></div><label className="custom-problem">Detalles adicionales <span>(opcional)</span><textarea value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} placeholder="Cuéntanos cuándo empezó, si muestra un error o cualquier detalle útil." /></label></div>{message && <p className="form-message">{message}</p>}<button className="button support-submit" type="submit">💬 Continuar por WhatsApp</button></form></section>
}

/* Legacy account, ticket and server-request code intentionally excluded from the frontend-only version.
const issueOptions = {
  Laptop: [
    ['no-enciende', 'No enciende o no carga'], ['lento', 'Está lenta o se congela'], ['pantalla', 'Problema de pantalla'], ['bateria', 'Batería, cargador o puerto'], ['teclado', 'Teclado o touchpad'], ['software', 'Sistema, programas o virus'], ['conectividad', 'Wi‑Fi, Bluetooth o puertos'], ['otro', 'Otro problema'],
  ],
  'Computadora / PC': [
    ['no-enciende', 'No enciende o se reinicia'], ['lento', 'Está lenta o se congela'], ['pantalla', 'No da imagen o falla el monitor'], ['temperatura', 'Se calienta o hace mucho ruido'], ['componentes', 'Disco, memoria o componentes'], ['software', 'Sistema, programas o virus'], ['conectividad', 'Internet, puertos o periféricos'], ['otro', 'Otro problema'],
  ],
  Impresora: [
    ['no-enciende', 'No enciende'], ['no-imprime', 'No imprime o imprime en blanco'], ['atasco', 'Atasco de papel'], ['calidad', 'Manchas, líneas o mala calidad'], ['tinta', 'Tinta, cartuchos o sistema continuo'], ['conexion', 'No conecta por Wi‑Fi o USB'], ['error', 'Muestra un código de error'], ['otro', 'Otro problema'],
  ],
}

const symptomOptions = {
  Laptop: ['Hace ruidos extraños', 'Se apaga sola', 'Ocurrió después de una caída', 'Necesito recuperar archivos'],
  'Computadora / PC': ['Hace ruidos extraños', 'Se apaga sola', 'Ocurrió después de un corte de luz', 'Necesito recuperar archivos'],
  Impresora: ['El problema aparece con todos los documentos', 'Usa tinta continua', 'El problema empezó después de recargar tinta', 'Necesito imprimir con urgencia'],
}

function Support() {
  const savedUser = JSON.parse(localStorage.getItem('tec_user') || 'null')
  const initialForm = { name: savedUser?.name || '', email: savedUser?.email || '', phone: '', contactPreference: 'WhatsApp', equipment: '', deviceBrand: '', deviceModel: '', issueCategory: '', symptoms: [], customProblem: '', problem: '' }
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const selectedIssue = issueOptions[form.equipment]?.find(([value]) => value === form.issueCategory)?.[1] || ''
  const needsCustomProblem = form.issueCategory === 'otro'
  const updateEquipment = (equipment) => setForm({ ...form, equipment, deviceBrand: '', deviceModel: '', issueCategory: '', symptoms: [], customProblem: '', problem: '' })
  const toggleSymptom = (symptom) => setForm({ ...form, symptoms: form.symptoms.includes(symptom) ? form.symptoms.filter((item) => item !== symptom) : [...form.symptoms, symptom] })
  const submit = async (event) => {
    event.preventDefault()
    const problem = [selectedIssue, ...form.symptoms, needsCustomProblem ? form.customProblem.trim() : ''].filter(Boolean).join('. ')
    if (!problem) return setMessage('Selecciona la falla principal de tu equipo.')
    setSending(true); setMessage('')
    try { const data = await api('/support-requests', { method: 'POST', body: JSON.stringify({ ...form, problem }) }); setMessage(data.message); setForm(initialForm) } catch (error) { setMessage(error.message) } finally { setSending(false) }
  }
  return <section className="support support-guided"><div className="support-copy"><p className="eyebrow">SOPORTE TÉCNICO</p><h1>Registra tu caso en pocos pasos.</h1><p className="lead">Elige las opciones que mejor describen tu equipo. Así podemos preparar una atención más rápida y precisa.</p><ol className="support-steps"><li><b>1</b> Indica el equipo</li><li><b>2</b> Marca la falla</li><li><b>3</b> Envíanos tu solicitud</li></ol><div className="contact-card"><b>Horario de atención</b><span>Lunes a sábado · 9:00 a.m. – 6:00 p.m.</span></div></div><form className="form support-form" onSubmit={submit}><div className="form-section"><span className="form-step">1</span><div><h2>Tu equipo</h2><p>Selecciona el equipo que necesita revisión.</p></div><div className="equipment-choices">{['Laptop', 'Computadora / PC', 'Impresora'].map((equipment) => <label className={form.equipment === equipment ? 'equipment-choice active' : 'equipment-choice'} key={equipment}><input type="radio" name="equipment" value={equipment} checked={form.equipment === equipment} onChange={() => updateEquipment(equipment)} /><span>{equipment === 'Laptop' ? '▱' : equipment === 'Impresora' ? '▤' : '▣'}</span><b>{equipment}</b></label>)}</div></div>{form.equipment && <><div className="device-details"><p>Identifica tu equipo <span>(opcional, pero ayuda a atenderte mejor)</span></p><label>Marca<input value={form.deviceBrand} onChange={(e) => setForm({ ...form, deviceBrand: e.target.value })} placeholder={form.equipment === 'Impresora' ? 'Ej. Epson, HP, Canon' : 'Ej. Lenovo, HP, Acer'} /></label><label>Modelo<input value={form.deviceModel} onChange={(e) => setForm({ ...form, deviceModel: e.target.value })} placeholder={form.equipment === 'Impresora' ? 'Ej. EcoTank L3250' : 'Ej. IdeaPad, Aspire'} /></label></div><div className="form-section issue-section"><span className="form-step">2</span><div><h2>¿Qué está ocurriendo?</h2><p>Elige la opción más parecida al problema.</p></div><div className="issue-options">{issueOptions[form.equipment].map(([value, label]) => <label className={form.issueCategory === value ? 'issue-option active' : 'issue-option'} key={value}><input required type="radio" name="issueCategory" value={value} checked={form.issueCategory === value} onChange={() => setForm({ ...form, issueCategory: value, customProblem: value === 'otro' ? form.customProblem : '' })} /><span>{label}</span></label>)}</div>{needsCustomProblem && <label className="custom-problem">Cuéntanos brevemente qué sucede<textarea required minLength="10" value={form.customProblem} onChange={(e) => setForm({ ...form, customProblem: e.target.value })} placeholder="Describe el problema, cuándo ocurre y qué mensaje aparece si lo hay." /></label>}<fieldset className="symptom-options"><legend>Detalles adicionales <span>(opcionales)</span></legend>{symptomOptions[form.equipment].map((symptom) => <label key={symptom}><input type="checkbox" checked={form.symptoms.includes(symptom)} onChange={() => toggleSymptom(symptom)} />{symptom}</label>)}</fieldset></div><div className="form-section contact-section"><span className="form-step">3</span><div><h2>¿Cómo te contactamos?</h2><p>Usaremos estos datos solamente para atender tu solicitud.</p></div><div className="contact-fields"><label>Nombre completo<input required readOnly={Boolean(savedUser)} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" /></label><label>Correo electrónico<input required type="email" readOnly={Boolean(savedUser)} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="correo@ejemplo.com" /></label><label>Teléfono o WhatsApp <span>(opcional)</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Ej. 999 999 999" /></label><label>Medio de contacto preferido<select value={form.contactPreference} onChange={(e) => setForm({ ...form, contactPreference: e.target.value })}><option>WhatsApp</option><option>Llamada telefónica</option><option>Correo electrónico</option></select></label></div>{savedUser && <p className="form-locked">Tu nombre y correo están bloqueados porque el ticket se asociará a tu cuenta.</p>}</div></>}{message && <p className="form-message">{message}</p>}<button className="button support-submit" disabled={sending || !form.equipment}>{sending ? 'Enviando solicitud...' : 'Enviar solicitud de soporte →'}</button></form></section>
}
function Auth({ register = false }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const submit = async (event) => { event.preventDefault(); setSending(true); setMessage(''); try { const endpoint = register ? '/auth/register' : '/auth/login'; const payload = register ? form : { email: form.email, password: form.password }; const data = await api(endpoint, { method: 'POST', body: JSON.stringify(payload) }); localStorage.setItem('tec_token', data.token); localStorage.setItem('tec_user', JSON.stringify(data.user)); window.dispatchEvent(new Event('tec-auth-changed')); navigate('/') } catch (error) { setMessage(error.message) } finally { setSending(false) } }
  return <section className="auth"><div className="auth-copy"><Link className="logo" to="/">TEC<span>+</span><small>SOLUCIONES DIGITALES</small></Link><h1>{register ? 'Crea tu cuenta.' : 'Qué bueno verte de nuevo.'}</h1><p>{register ? 'Regístrate para seguir tus compras y solicitudes técnicas.' : 'Ingresa para revisar tus solicitudes y compras.'}</p></div><form className="form auth-form" onSubmit={submit}><h2>{register ? 'Registrarme' : 'Iniciar sesión'}</h2>{register && <label>Nombre completo<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" /></label>}<label>Correo electrónico<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="correo@ejemplo.com" /></label><label>Contraseña<input required minLength="8" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 8 caracteres" /></label>{message && <p className="form-message">{message}</p>}<button className="button" disabled={sending}>{sending ? 'Procesando...' : register ? 'Crear mi cuenta' : 'Ingresar'}</button><p>{register ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'} <Link to={register ? '/login' : '/registro'}>{register ? 'Ingresa' : 'Regístrate'}</Link></p></form></section>
}
*/
function Footer() { return <footer><div><img className="footer-logo" src={anavegarLogo} alt="Anavegar Soluciones" /><p>Accesorios, componentes y servicio técnico de confianza.</p></div><div><b>Compra segura</b><p>Productos con garantía y comprobante de pago.</p></div><div><b>Atención directa</b><p>Lunes a sábado · 9 a.m. – 6 p.m.</p></div><div><b>Visítanos</b><p>📍 Paucarpata, Arequipa, Perú</p><p><a href="https://maps.app.goo.gl/C9uQXsM2Hbm4yjjM6" target="_blank" rel="noreferrer">Ver ubicación en Maps</a></p></div><div className="footer-social" aria-label="Síguenos en redes sociales"><span>Encuéntranos en</span><div>{socialIcons.map((social) => social.href ? <a key={social.name} className="social-icon footer-social-icon" href={social.href} target="_blank" rel="noreferrer" title={social.name} aria-label={social.name}><SocialLogo brand={social.className} /></a> : <i key={social.name} className="social-icon footer-social-icon" title={social.name} aria-label={social.name}><SocialLogo brand={social.className} /></i>)}<a className="footer-whatsapp" href="https://wa.me/51967327944" target="_blank" rel="noreferrer"><i className="whatsapp-logo"><WhatsAppLogo /></i>WhatsApp: 967 327 944</a></div></div></footer> }
function App() { const path = usePath(); return <CartProvider><Header /><FloatingCartBubble path={path} /><main><div className="page-transition" key={path}><Routes><Route path="/" element={<Home />} /><Route path="/servicios" element={<Services />} /><Route path="/tienda" element={<Store />} /><Route path="/producto/:id" element={<ProductDetail />} /><Route path="/carrito" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/soporte" element={<SupportWhatsApp />} /></Routes></div></main><Footer /></CartProvider> }
export default App
