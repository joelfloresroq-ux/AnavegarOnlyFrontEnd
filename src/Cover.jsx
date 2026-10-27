import { useSyncExternalStore } from 'react'

const subscribe = (notify) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
const getTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

// Muestra la carátula en su versión clara u oscura según el tema activo del sitio.
export default function Cover({ src, alt = '', ...props }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light')
  const themed = theme === 'dark' && /\/covers\/[^/]+\.svg$/.test(src) && !src.endsWith('-dark.svg') ? src.replace(/\.svg$/, '-dark.svg') : src
  return <img src={themed} alt={alt} {...props} />
}
