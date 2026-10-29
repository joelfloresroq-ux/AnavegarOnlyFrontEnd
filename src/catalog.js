// Catálogo temporal del frontend. Las licencias se tomaron de la hoja
// “Catálogo” del CRM y podrán migrarse después a Supabase.
// Por ahora la tienda solo vende licencias digitales (sin productos físicos).
const images = {
  office2016: '/catalog/covers/office-2016.svg',
  office2019: '/catalog/covers/office-2019.svg',
  office2021: '/catalog/covers/office-2021.svg',
  office2024: '/catalog/covers/office-2024.svg',
  microsoft365: '/catalog/covers/microsoft-365.svg',
  windows: '/catalog/covers/windows-11.svg',
  windows10: '/catalog/covers/windows-10.svg',
  canva: '/catalog/covers/canva.svg',
  capcut: '/catalog/covers/capcut-1m.svg',
  gemini: '/catalog/covers/gemini-18m.svg',
}

// Los productos por tiempo (meses) no muestran la duración en las tarjetas de la tienda:
// se elige en la página del producto cuando tiene variantes, o se lista en sus características.
const license = ({ id, name, brand, duration, devices, delivery, activation, price, image, renewable = false, notes, variants }) => {
  const permanent = !/mes/i.test(duration)
  const method = activation || delivery
  return {
    id, name, brand, price, image, type: 'license', permanent, renewable, variants,
    description: permanent ? `${duration} · Activación: ${method}.` : `Activación: ${method}.`,
    details: permanent
      ? [`Duración: ${duration}`, devices, `Método de activación: ${method}`, `Entrega: ${delivery}`]
      : [devices, `Método de activación: ${method}`, `Entrega: ${delivery}`, ...(variants ? [] : [`Duración: ${duration}`])],
    longDescription: notes || `Licencia digital ${brand} con entrega coordinada por Anavegar Soluciones.`,
  }
}

// Texto de precio: "Desde" si el producto tiene varias duraciones.
export const priceLabel = (product) => `${product.variants ? 'Desde ' : ''}S/ ${product.price.toFixed(2)}`
// Producto listo para el carrito según la duración elegida.
export const withVariant = (product, variant) => variant ? { ...product, id: variant.id, name: `${product.name} · ${variant.label}`, price: variant.price, variants: undefined } : product
export const findProduct = (id) => licenseProducts.find((item) => item.id === id || item.variants?.some((variant) => variant.id === id))

export const bestSellerIds = ['OFF21-PHONE', 'WIN11-RET', 'M365-ACCOUNT', 'CAN-EDU', 'GEM-INV-18M', 'CAP-TEAM-01M']

export const licenseProducts = [
  license({ id: 'OFF16-PHONE', name: 'Office Retail Professional Plus 2016 — Activación por teléfono', brand: 'Office', duration: 'Permanente', devices: '1 dispositivo', delivery: 'Key Phone', activation: 'Por teléfono', price: 16, image: images.office2016, notes: 'Compatible con Windows. La activación se realiza por teléfono.' }),
  license({ id: 'OFF19-PHONE', name: 'Office Retail Professional Plus 2019 — Activación por teléfono', brand: 'Office', duration: 'Permanente', devices: '1 dispositivo', delivery: 'Key Phone', activation: 'Por teléfono', price: 18, image: images.office2019, notes: 'Compatible con Windows. La activación se realiza por teléfono.' }),
  license({ id: 'OFF21-PHONE', name: 'Office Retail Professional Plus 2021 — Activación por teléfono', brand: 'Office', duration: 'Permanente', devices: '1 dispositivo', delivery: 'Key Phone', activation: 'Por teléfono', price: 20, image: images.office2021, notes: 'Compatible con Windows. La activación se realiza por teléfono.' }),
  license({ id: 'OFF24-PHONE', name: 'Office Professional Plus LTSC 2024 — Activación por teléfono', brand: 'Office', duration: 'Permanente', devices: '1 dispositivo', delivery: 'Key Phone', activation: 'Por teléfono', price: 25, image: images.office2024, notes: 'Compatible con Windows. La activación se realiza por teléfono.' }),
  license({ id: 'OFF24-DIRECT', name: 'Office Professional Plus LTSC 2024 — Clave directa', brand: 'Office', duration: 'Permanente', devices: '1 dispositivo', delivery: 'Key directa', activation: 'Clave directa', price: 35, image: images.office2024, notes: 'Compatible con Windows. Recibes una clave directa para activar el producto.' }),
  license({ id: 'M365-ACCOUNT', name: 'Microsoft 365 Pro – Cuenta nueva entregada', brand: 'Microsoft 365', duration: '12 meses', devices: 'Hasta 5 dispositivos', delivery: 'Cuenta generada', price: 25, image: images.microsoft365, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'M365-OWN', name: 'Microsoft 365 Pro – Cuenta propia', brand: 'Microsoft 365', duration: '12 meses', devices: 'Hasta 5 dispositivos', delivery: 'Invitación al correo', price: 45, image: images.microsoft365, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'WIN10-RET', name: 'Windows 10 Pro Retail', brand: 'Windows', duration: 'Permanente', devices: '1 PC', delivery: 'Key directa', price: 19, image: images.windows10, notes: 'Licencia para un equipo Windows.' }),
  license({ id: 'WIN10-OEM', name: 'Windows 10 Pro OEM', brand: 'Windows', duration: 'Permanente', devices: '1 PC', delivery: 'Key directa', price: 25, image: images.windows10, notes: 'Licencia para un equipo Windows.' }),
  license({ id: 'WIN11-RET', name: 'Windows 11 Pro Retail', brand: 'Windows', duration: 'Permanente', devices: '1 PC', delivery: 'Key directa', price: 19, image: images.windows, notes: 'Licencia para un equipo Windows.' }),
  license({ id: 'WIN11-OEM', name: 'Windows 11 Pro OEM', brand: 'Windows', duration: 'Permanente', devices: '1 PC', delivery: 'Key directa', price: 25, image: images.windows, notes: 'Licencia para un equipo Windows.' }),
  license({ id: 'CAN-EDU', name: 'Canva Pro Edu – Invitación a equipo', brand: 'Canva', duration: '1 mes', devices: '1 cupo', delivery: 'Invitación a equipo', price: 5, image: images.canva, renewable: true, notes: 'Requiere cuenta propia y comprobación de elegibilidad o autorización educativa.', variants: [{ id: 'CAN-EDU-01M', label: '1 mes', price: 5 }, { id: 'CAN-EDU-03M', label: '3 meses', price: 10 }, { id: 'CAN-EDU-06M', label: '6 meses', price: 20 }, { id: 'CAN-EDU-12M', label: '12 meses', price: 30 }] }),
  license({ id: 'CAP-TEAM-01M', name: 'CapCut Pro Team', brand: 'CapCut', duration: '1 mes', devices: 'Hasta 2 dispositivos', delivery: 'Cuenta generada', price: 19, image: images.capcut, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'GEM-INV-18M', name: 'Gemini Pro – Invitación', brand: 'Gemini', duration: '18 meses', devices: '1 dispositivo', delivery: 'Invitación al correo', price: 19, image: images.gemini, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'GEM-LINK-18M', name: 'Gemini Pro – Activación directa', brand: 'Gemini', duration: '18 meses', devices: 'Hasta 6 dispositivos', delivery: 'Link de activación', price: 35, image: images.gemini, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
]
