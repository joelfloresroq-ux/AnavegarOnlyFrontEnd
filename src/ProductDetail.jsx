import { useState } from 'react'
import Cover from './Cover.jsx'
import { Link, useNavigate } from './router.jsx'
import { licenseProducts, bestSellerIds } from './catalog.js'
import { useCart } from './cart.jsx'
import { AddToCartButton } from './PurchaseGate.jsx'
import { whatsappLink } from './whatsapp.js'
import './product-detail.css'
import './polish.css'

const money = (value) => `S/ ${value.toFixed(2)}`

function ProductGallery({ product }) {
  const images = product.gallery || [product.image]
  const [activeImage, setActiveImage] = useState(0)
  const selectImage = (index) => setActiveImage((index + images.length) % images.length)
  return <div className="detail-gallery"><div className="detail-image"><Cover src={images[activeImage]} alt={`${product.name} - vista ${activeImage + 1}`} /></div>{images.length > 1 && <><button className="gallery-arrow previous" type="button" onClick={() => selectImage(activeImage - 1)} aria-label="Imagen anterior">←</button><button className="gallery-arrow next" type="button" onClick={() => selectImage(activeImage + 1)} aria-label="Imagen siguiente">→</button><div className="gallery-thumbnails">{images.map((image, index) => <button key={image} type="button" className={index === activeImage ? 'active' : ''} onClick={() => selectImage(index)} aria-label={`Ver imagen ${index + 1}`}><img src={image} alt="" /></button>)}</div></>}
  </div>
}

export default function ProductDetail({ id }) {
  const { add } = useCart()
  const navigate = useNavigate()
  const product = licenseProducts.find((item) => item.id === id)
  if (!product) return <section className="detail-page"><h1>Producto no encontrado.</h1><Link className="button" to="/tienda">Volver a la tienda</Link></section>
  const related = [...licenseProducts.filter((item) => item.id !== id && item.brand === product.brand), ...licenseProducts.filter((item) => item.id !== id && item.brand !== product.brand)].slice(0, 3)
  const buyNow = () => { add(product); navigate('/carrito') }
  const ask = whatsappLink(`Hola, tengo una consulta sobre: ${product.name}`)
  return <section className="detail-page"><nav className="crumbs" aria-label="Ruta"><Link to="/">Inicio</Link><span>/</span><Link to="/tienda">Licencias</Link><span>/</span><b>{product.brand}</b></nav>
    <article className="product-detail"><ProductGallery product={product} />
      <div className="detail-info">
        <p className="eyebrow">{product.brand} · LICENCIA DIGITAL{bestSellerIds.includes(product.id) ? ' · MÁS VENDIDA' : ''}</p>
        <h1>{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        <div className="detail-price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}<span className="detail-stock">✓ Entrega digital</span></div>
        <div className="detail-actions"><button className="button green" type="button" onClick={buyNow}>Comprar ahora</button><AddToCartButton className="button" product={product} /></div>
        <ul className="detail-benefits"><li><i>◎</i><div><b>Paga con Yape</b><span>Escanea el QR en el carrito.</span></div></li><li><i>⚡</i><div><b>Recibe por WhatsApp</b><span>Envías tu comprobante y te entregamos.</span></div></li><li><i>☏</i><div><b>Ayuda con la activación</b><span>Te guiamos si lo necesitas.</span></div></li></ul>
        {product.longDescription && <div className="detail-product-copy"><h2>Detalles del producto</h2><p>{product.longDescription}</p></div>}
        <div className="detail-specs"><h2>Características</h2><ul>{product.details.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
        {product.specifications && <div className="detail-tech-specs"><h2>Especificaciones</h2>{product.specifications.map(([label, value]) => <p key={label}><b>{label}</b><span>{value}</span></p>)}</div>}
        <a className="detail-ask" href={ask} target="_blank" rel="noreferrer">💬 ¿Dudas sobre este producto? Escríbenos</a>
      </div>
    </article>
    <section className="related"><h2>También te puede interesar</h2><div className="related-grid">{related.map((item) => <Link className="related-card" key={item.id} to={`/producto/${item.id}`}><Cover src={item.image} alt="" loading="lazy" /><p>{item.brand}</p><b>{item.name}</b><strong>{money(item.price)}</strong></Link>)}</div></section>
  </section>
}
