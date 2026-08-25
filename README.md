# Anavegar Soluciones — Frontend

Versión independiente de la web de Anavegar. Incluye catálogo, productos, carrito, tema claro/oscuro, servicios y solicitudes por WhatsApp.

No incluye servidor Node, base de datos, cuentas de usuario, inicio de sesión, administración ni seguimiento de tickets.

## Ejecutar localmente

1. Copia `.env.example` como `.env`.
2. Cambia `VITE_WHATSAPP_NUMBER` por el número de WhatsApp Business, con código de país y sin el signo `+`.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev`.

Para generar la versión de producción, usa `npm run build`. Vite creará la carpeta `dist`, lista para publicar en Cloudflare Pages.
