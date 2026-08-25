/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const RouterContext = createContext({ path: '/', navigate: () => {} })

export function BrowserRouter({ children }) {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])
  const navigate = (to) => { const url = new URL(to, window.location.origin); window.history.pushState({}, '', to); setPath(url.pathname); window.scrollTo(0, 0); if (url.hash) window.dispatchEvent(new HashChangeEvent('hashchange')) }
  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function Link({ to, children, ...props }) {
  const { navigate } = useContext(RouterContext)
  return <a href={to} {...props} onClick={(event) => { props.onClick?.(event); if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey) { event.preventDefault(); navigate(to) } }}>{children}</a>
}

export function useNavigate() {
  return useContext(RouterContext).navigate
}

export function usePath() {
  return useContext(RouterContext).path
}

export function NavLink({ to, end, children, className = '', ...props }) {
  const { path } = useContext(RouterContext)
  const active = end ? path === to : path === to || path.startsWith(`${to}/`)
  return <Link to={to} className={`${className} ${active ? 'active' : ''}`.trim()} {...props}>{children}</Link>
}

export function Route() { return null }
export function Routes({ children }) {
  const { path } = useContext(RouterContext)
  const routes = Array.isArray(children) ? children : [children]
  const selected = routes.find((route) => route?.props.path === path) || routes.find((route) => route?.props.path?.includes(':') && new RegExp(`^${route.props.path.replace(/:[^/]+/g, '([^/]+)')}$`).test(path)) || routes.find((route) => route?.props.path === '/')
  if (!selected) return null
  const match = selected.props.path.includes(':') ? path.match(new RegExp(`^${selected.props.path.replace(/:[^/]+/g, '([^/]+)')}$`)) : null
  return match ? { ...selected.props.element, props: { ...selected.props.element.props, id: match[1] } } : selected.props.element
}
