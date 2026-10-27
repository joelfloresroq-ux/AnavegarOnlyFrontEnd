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
  canva1: '/catalog/covers/canva-1m.svg',
  canva3: '/catalog/covers/canva-3m.svg',
  canva6: '/catalog/covers/canva-6m.svg',
  canva12: '/catalog/covers/canva-12m.svg',
  capcut: '/catalog/covers/capcut-1m.svg',
  gemini: '/catalog/covers/gemini-18m.svg',
}

const license = ({ id, name, brand, duration, devices, delivery, activation, price, image, renewable = false, notes }) => ({
  id, name, brand, price, image, type: 'license',
  description: `${duration} · Activación: ${activation || delivery}.`,
  details: [`Duración: ${duration}`, devices, `Método de activación: ${activation || delivery}`, `Entrega: ${delivery}`, renewable ? 'Renovable' : 'No renovable'],
  longDescription: notes || `Licencia digital ${brand} con entrega coordinada por Anavegar Soluciones.`,
})

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
  license({ id: 'CAN-EDU-01M', name: 'Canva Pro Edu – Invitación a equipo', brand: 'Canva', duration: '1 mes', devices: '1 cupo', delivery: 'Invitación a equipo', price: 5, image: images.canva1, renewable: true, notes: 'Requiere cuenta propia y comprobación de elegibilidad o autorización educativa.' }),
  license({ id: 'CAN-EDU-03M', name: 'Canva Pro Edu – Invitación a equipo', brand: 'Canva', duration: '3 meses', devices: '1 cupo', delivery: 'Invitación a equipo', price: 10, image: images.canva3, renewable: true, notes: 'Requiere cuenta propia y comprobación de elegibilidad o autorización educativa.' }),
  license({ id: 'CAN-EDU-06M', name: 'Canva Pro Edu – Invitación a equipo', brand: 'Canva', duration: '6 meses', devices: '1 cupo', delivery: 'Invitación a equipo', price: 20, image: images.canva6, renewable: true, notes: 'Requiere cuenta propia y comprobación de elegibilidad o autorización educativa.' }),
  license({ id: 'CAN-EDU-12M', name: 'Canva Pro Edu – Invitación a equipo', brand: 'Canva', duration: '12 meses', devices: '1 cupo', delivery: 'Invitación a equipo', price: 30, image: images.canva12, renewable: true, notes: 'Requiere cuenta propia y comprobación de elegibilidad o autorización educativa.' }),
  license({ id: 'CAP-TEAM-01M', name: 'CapCut Pro Team', brand: 'CapCut', duration: '1 mes', devices: 'Hasta 2 dispositivos', delivery: 'Cuenta generada', price: 19, image: images.capcut, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'GEM-INV-18M', name: 'Gemini Pro – Invitación', brand: 'Gemini', duration: '18 meses', devices: '1 dispositivo', delivery: 'Invitación al correo', price: 19, image: images.gemini, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
  license({ id: 'GEM-LINK-18M', name: 'Gemini Pro – Activación directa', brand: 'Gemini', duration: '18 meses', devices: 'Hasta 6 dispositivos', delivery: 'Link de activación', price: 35, image: images.gemini, renewable: true, notes: 'Compatible con Windows, Mac, iOS y Android.' }),
]
