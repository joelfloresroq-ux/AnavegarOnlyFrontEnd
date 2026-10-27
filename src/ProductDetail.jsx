import { useState } from 'react'
import { Link } from './router.jsx'
import { licenseProducts } from './catalog.js'
import { AddToCartButton } from './PurchaseGate.jsx'
import './product-detail.css'

const allProducts = licenseProducts
const money = (value) => `S/ ${value.toFixed(2)}`

function ProductGallery({ product }) {
  const images = product.gallery || [product.image]
  const [activeImage, setActiveImage] = useState(0)
  const selectImage = (index) => setActiveImage((index + images.length) % images.length)
  return <div className="detail-gallery"><div className="detail-image"><img src={images[activeImage]} alt={`${product.name} - vista ${activeImage + 1}`} /></div>{images.length > 1 && <><button className="gallery-arrow previous" type="button" onClick={() => selectImage(activeImage - 1)} aria-label="Imagen anterior">←</button><button className="gallery-arrow next" type="button" onClick={() => selectImage(activeImage + 1)} aria-label="Imagen siguiente">→</button><div className="gallery-thumbnails">{images.map((image, index) => <button key={image} type="button" className={index === activeImage ? 'active' : ''} onClick={() => selectImage(index)} aria-label={`Ver imagen ${index + 1}`}><img src={image} alt="" /></button>)}</div></>}
  </div>
}

export default function ProductDetail({ id }) {
  const product = allProducts.find((item) => item.id === id)
  if (!product) return <section className="detail-page"><h1>Producto no encontrado.</h1><Link className="button" to="/tienda">Volver a la tienda</Link></section>
  return <section className="detail-page"><Link className="back-link" to="/tienda">← Volver a la tienda</Link><article className="product-detail"><ProductGallery product={product} /><div className="detail-info"><p className="eyebrow">{product.brand} · {'LICENCIA DIGITAL'}</p><h1>{product.name}</h1><p className="detail-description">{product.description}</p>{product.longDescription && <div className="detail-product-copy"><h2>Detalles del producto</h2><p>{product.longDescription}</p></div>}<div className="detail-price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><div className="detail-specs"><h2>Características</h2><ul>{product.details.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>{product.specifications && <div className="detail-tech-specs"><h2>Especificaciones</h2>{product.specifications.map(([label, value]) => <p key={label}><b>{label}</b><span>{value}</span></p>)}</div>}<AddToCartButton className="button" product={product} /><Link className="button detail-cart" to="/carrito">Ver carrito</Link></div></article></section>
}
