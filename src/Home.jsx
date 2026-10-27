import { useEffect } from 'react'
import Cover from './Cover.jsx'
import { Link } from './router.jsx'
import { licenseProducts, bestSellerIds } from './catalog.js'
import { AddToCartButton } from './PurchaseGate.jsx'
import { whatsappLink } from './whatsapp.js'
import './home.css'

const money = (value) => `S/ ${value.toFixed(2)}`
const byId = (id) => licenseProducts.find((product) => product.id === id)

const bestSellers = bestSellerIds.map(byId).filter(Boolean)
const brandTiles = [
  { brand: 'Office', label: 'Office', note: '2016, 2019, 2021 y 2024', image: '/catalog/covers/office-2021.svg' },
  { brand: 'Windows', label: 'Windows', note: '10 y 11 Pro', image: '/catalog/covers/windows-11.svg' },
  { brand: 'Microsoft 365', label: 'Microsoft 365', note: 'Hasta 5 dispositivos', image: '/catalog/covers/microsoft-365.svg' },
  { brand: 'Canva', label: 'Canva Pro', note: 'Desde 1 mes', image: '/catalog/covers/canva-12m.svg' },
  { brand: 'CapCut', label: 'CapCut Pro', note: 'Edición de video', image: '/catalog/covers/capcut-1m.svg' },
  { brand: 'Gemini', label: 'Gemini Pro', note: '18 meses', image: '/catalog/covers/gemini-18m.svg' },
]
const trust = [
  { icon: '✓', title: 'Licencias originales', text: 'Software legítimo para tu equipo.' },
  { icon: '⚡', title: 'Entrega rápida', text: 'Te enviamos tu licencia por WhatsApp.' },
  { icon: '◎', title: 'Pago con Yape', text: 'Escanea el QR y paga en segundos.' },
  { icon: '☏', title: 'Soporte en activación', text: 'Te guiamos paso a paso.' },
]
const steps = [
  { n: '1', title: 'Elige tu licencia', text: 'Agrega al carrito lo que necesitas: Office, Windows, Canva y más.' },
  { n: '2', title: 'Paga con Yape', text: 'Escanea el QR del carrito y paga el total por adelantado.' },
  { n: '3', title: 'Recibe tu producto', text: 'Envía tu comprobante por WhatsApp y te entregamos la licencia.' },
]
const faqs = [
  ['¿Cómo compro?', 'Agrega tus licencias al carrito, paga con el QR de Yape y envíanos el comprobante por WhatsApp. Tu pedido se arma con un solo botón.'],
  ['¿Cuánto demora la entrega?', 'Una vez que confirmamos tu pago por WhatsApp, te enviamos la licencia o el acceso. Escríbenos y te indicamos el tiempo según el producto.'],
  ['¿Qué diferencia hay entre activación por teléfono y clave directa?', 'Con la activación por teléfono te guiamos para activar Office por llamada automática. La clave directa se ingresa y activa sin ese paso.'],
  ['¿Qué pasa si tengo problemas al activar?', 'Escríbenos por WhatsApp y te ayudamos con la activación.'],
  ['¿Atienden servicio técnico?', 'Sí. Reparamos laptops, computadoras e impresoras en Paucarpata, Arequipa. Solicita tu diagnóstico desde la sección de soporte.'],
]

const REVEAL = '.hm-heading, .hm-trust article, .hm-product, .hm-brands a, .hm-steps li, .hm-steps-cta, .hm-more, .hm-service, .hm-faq details, .hm-final'
function useScrollReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll(REVEAL)]
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const siblings = new Map()
    nodes.forEach((node) => { const index = siblings.get(node.parentElement) || 0; siblings.set(node.parentElement, index + 1); node.style.setProperty('--d', `${Math.min(index, 5) * 90}ms`); node.classList.add('hm-reveal') })
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('hm-in'); observer.unobserve(entry.target) } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function Home() {
  useScrollReveal()
  return <>
    <section className="hm-hero">
      <div className="hm-hero-copy">
        <p className="eyebrow">LICENCIAS DIGITALES ORIGINALES</p>
        <h1>Office, Windows y más, <em>activado hoy mismo.</em></h1>
        <p className="hm-lead">Compra online, paga con Yape y recibe tu licencia por WhatsApp. Desde S/ {Math.min(...licenseProducts.map((p) => p.price)).toFixed(0)}.</p>
        <div className="hm-cta">
          <Link className="button green" to="/tienda">Ver licencias</Link>
          <a className="button hm-wa" href={whatsappLink('Hola, quiero información sobre las licencias de Anavegar Soluciones.')} target="_blank" rel="noreferrer">💬 Cotizar por WhatsApp</a>
        </div>
        <ul className="hm-chips"><li>✓ Pago con Yape</li><li>✓ Entrega por WhatsApp</li><li>✓ Soporte en Arequipa</li></ul>
      </div>
      <div className="hm-hero-art" aria-hidden="true">
        <Cover className="art-a" src="/catalog/covers/office-2021.svg" alt="" />
        <Cover className="art-b" src="/catalog/covers/windows-11.svg" alt="" />
        <Cover className="art-c" src="/catalog/covers/canva-12m.svg" alt="" />
      </div>
    </section>

    <section className="hm-trust" aria-label="Por qué comprar en Anavegar">{trust.map((item) => <article key={item.title}><i>{item.icon}</i><div><b>{item.title}</b><span>{item.text}</span></div></article>)}</section>

    <section className="hm-section">
      <div className="hm-heading"><p className="eyebrow">MÁS VENDIDAS</p><h2>Las licencias que más buscan</h2><p>Elige, agrega al carrito y paga con Yape.</p></div>
      <div className="hm-products">{bestSellers.map((product) => <article className="hm-product" key={product.id}>
        <Link to={`/producto/${product.id}`}><Cover src={product.image} alt={product.name} loading="lazy" /></Link>
        <p>{product.brand}</p><h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
        <small>{product.description}</small>
        <div className="hm-price"><strong>{money(product.price)}</strong><span>{product.details[4]}</span></div>
        <AddToCartButton product={product} />
      </article>)}</div>
      <p className="hm-more"><Link to="/tienda">Ver las {licenseProducts.length} licencias →</Link></p>
    </section>

    <section className="hm-section hm-alt">
      <div className="hm-heading"><p className="eyebrow">EXPLORA POR MARCA</p><h2>Todo el software que necesitas</h2></div>
      <div className="hm-brands">{brandTiles.map((tile) => <Link key={tile.brand} to="/tienda"><Cover src={tile.image} alt="" loading="lazy" /><b>{tile.label}</b><span>{tile.note}</span></Link>)}</div>
    </section>

    <section className="hm-section">
      <div className="hm-heading"><p className="eyebrow">CÓMO COMPRAR</p><h2>Tu licencia en 3 pasos</h2></div>
      <ol className="hm-steps">{steps.map((step) => <li key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      <div className="hm-steps-cta"><Link className="button green" to="/tienda">Empezar mi compra</Link></div>
    </section>

    <section className="hm-service">
      <div><p className="eyebrow">SERVICIO TÉCNICO EN AREQUIPA</p><h2>¿Tu laptop, PC o impresora falla?</h2><p>Diagnóstico y reparación para laptops, computadoras e impresoras. Cuéntanos qué pasa y te respondemos por WhatsApp.</p><div className="hm-cta"><Link className="button green" to="/soporte">Solicitar diagnóstico</Link><Link className="button hm-outline" to="/servicios">Ver servicios</Link></div></div>
      <img src="/hero/servicio-tecnico.png" alt="Reparación de laptops" loading="lazy" />
    </section>

    <section className="hm-section hm-faq">
      <div className="hm-heading"><p className="eyebrow">PREGUNTAS FRECUENTES</p><h2>Resolvemos tus dudas</h2></div>
      <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>

    <section className="hm-final">
      <h2>¿Listo para activar tu software?</h2>
      <p>Escríbenos y te ayudamos a elegir la licencia correcta.</p>
      <div className="hm-cta"><Link className="button green" to="/tienda">Comprar ahora</Link><a className="button hm-wa" href={whatsappLink('Hola, necesito ayuda para elegir una licencia.')} target="_blank" rel="noreferrer">💬 Hablar por WhatsApp</a></div>
    </section>
  </>
}
