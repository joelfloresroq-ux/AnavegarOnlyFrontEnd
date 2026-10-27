import { useEffect } from 'react'

// Revela con un fundido suave los elementos que coinciden con `selector` al entrar en pantalla.
// Se vuelve a ejecutar cuando cambia `key` (por ejemplo la ruta) y respeta "reducir movimiento".
export function useReveal(selector, key) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setTimeout(() => {
      const nodes = [...document.querySelectorAll(selector)].filter((node) => !node.classList.contains('rv'))
      const seen = new Map()
      nodes.forEach((node) => {
        const index = seen.get(node.parentElement) || 0
        seen.set(node.parentElement, index + 1)
        node.style.setProperty('--rv-d', `${Math.min(index, 6) * 70}ms`)
        node.classList.add('rv')
      })
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('rv-in'); observer.unobserve(entry.target) }
      }), { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
      nodes.forEach((node) => observer.observe(node))
      cleanup = () => observer.disconnect()
    }, 60)
    let cleanup = () => {}
    return () => { window.clearTimeout(timer); cleanup() }
  }, [selector, key])
}
