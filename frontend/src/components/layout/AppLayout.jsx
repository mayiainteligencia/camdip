import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileNav from './MobileNav'
import logoFspm from '@/assets/logos/fspm.jpeg'
import logoMayia from '@/assets/logos/mayiaLogoBlanco.png'

import config from '@/config/config'

// Mapa de rutas a títulos
const routeMeta = {
  '/':              { title: 'Comando Central' },
  '/vigilancia':    { title: 'Vigilancia y CCTV' },
  '/alertas':       { title: 'Centro de Alertas' },
  '/seguridad':     { title: 'Seguridad y Proveedores' },
  '/ciberseguridad':{ title: 'Ciberseguridad' },
  '/forensia':      { title: 'Análisis Forense Digital' },
  '/protocolos':    { title: 'Protocolos de Emergencia' },
  '/edificio':      { title: 'Información del Edificio' },
  '/configuracion': { title: 'Configuración' },
}

function metaFor(pathname) {
  if (routeMeta[pathname]) return routeMeta[pathname]
  return { title: 'Centro de Comando' }
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const meta = metaFor(pathname)
  const crumbs = [config.brand.shortName || config.brand.name]

  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth <= 768
      const tablet = window.innerWidth <= 1024 && window.innerWidth > 768
      setIsMobile(mobile)
      if (tablet && !collapsed) setCollapsed(true)
      if (window.innerWidth > 1024 && collapsed) setCollapsed(false)
    }
    window.addEventListener('resize', handler)
    if (window.innerWidth <= 1024) setCollapsed(true)
    return () => window.removeEventListener('resize', handler)
  }, [collapsed])

  const toggleSidebar = () => setCollapsed(c => !c)

  return (
    <div className="app-shell">
      {!isMobile && (
        <Sidebar collapsed={collapsed} mobileOpen={false} isMobile={false} />
      )}

      <div className="main-area">
        {!isMobile && (
          <>
            <div className="header-edge-logo left">
              <img src={logoFspm} alt="FSPM" />
            </div>
            <div className="header-edge-logo right">
              <img src={logoMayia} alt="MAYIA" />
            </div>
          </>
        )}
        <Header
          title={meta.title}
          crumbs={crumbs}
          collapsed={collapsed}
          isMobile={isMobile}
          onToggle={toggleSidebar}
        />
        <main className="content">
          <Outlet />
        </main>
      </div>

      {isMobile && <MobileNav />}
    </div>
  )
}
