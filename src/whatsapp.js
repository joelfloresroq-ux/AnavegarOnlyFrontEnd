const WHATSAPP = (import.meta.env.VITE_WHATSAPP_NUMBER || '51967327944').replace(/\D/g, '')
export const whatsappLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
