import { NavLink } from 'react-router-dom'
import config from '@/config/config'

/* ── Íconos SVG inline ────────────────────────────────────────── */
const IconComando = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    <path d="M7 8h10M7 12h4"/>
  </svg>
)
const IconVigilancia = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)
const IconRobots = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5"/>
    <circle cx="4" cy="4" r="1.6"/><circle cx="20" cy="4" r="1.6"/><circle cx="4" cy="20" r="1.6"/><circle cx="20" cy="20" r="1.6"/>
    <path d="M9.7 9.7 5.6 5.6M14.3 9.7l4.1-4.1M9.7 14.3l-4.1 4.1M14.3 14.3l4.1 4.1"/>
  </svg>
)
const IconAlertas = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const IconSeguridad = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconCiberseguridad = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
)
const IconForensia = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
)
const IconProtocolos = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <polyline points="10 16 8 16 8 18"/><line x1="10" y1="18" x2="16" y2="18"/>
  </svg>
)
const IconEdificio = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconConfig = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

/* ── Nav items ─────────────────────────────────────────────────── */
const nav = [
  { to: '/',             label: 'Comando Central', Icon: IconComando,    end: true },
  { to: '/vigilancia',   label: 'Vigilancia',      Icon: IconVigilancia },
  { to: '/robots',       label: 'Robots y Drones',  Icon: IconRobots },
  { to: '/alertas',      label: 'Alertas',         Icon: IconAlertas },
  { to: '/seguridad',    label: 'Seguridad',       Icon: IconSeguridad },
  { to: '/ciberseguridad',label: 'Ciberseguridad', Icon: IconCiberseguridad },
  { to: '/forensia',     label: 'Forensia',        Icon: IconForensia },
  { to: '/protocolos',   label: 'Protocolos',      Icon: IconProtocolos },
  { to: '/edificio',     label: 'Edificio',        Icon: IconEdificio },
  { to: '/configuracion',label: 'Configuración',   Icon: IconConfig },
]

/* Contador de alertas críticas/activas (mockup) */
const ALERT_COUNT = 3

function renderLink({ to, label, Icon, end }, isCollapsed) {
  const isAlerts = to === '/alertas'
  return (
    <NavLink
      key={to}
      to={to}
      end={end}
      style={({ isActive }) => ({
        ...s.link,
        ...(isActive ? s.linkActive : {}),
        justifyContent: isCollapsed ? 'center' : 'flex-start',
      })}
      title={isCollapsed ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <span style={{ ...s.iconWrap, color: isActive ? '#D6D989' : 'rgba(255,255,255,0.55)' }}>
            <Icon />
          </span>
          <span style={{ ...s.linkLabel, ...(isCollapsed ? s.hidden : {}) }}>{label}</span>
          {/* Badge de alertas */}
          {isAlerts && !isCollapsed && (
            <span style={s.alertBadge}>{ALERT_COUNT}</span>
          )}
          {isAlerts && isCollapsed && (
            <span style={{ ...s.alertBadgeMini }} />
          )}
          {isActive && !isCollapsed && <span style={s.activeDot} />}
        </>
      )}
    </NavLink>
  )
}

/* ── Component ─────────────────────────────────────────────────── */
export default function Sidebar({ collapsed, mobileOpen, isMobile }) {
  const isCollapsed = !isMobile && collapsed

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile && mobileOpen ? 'mobile-open' : ''}`}
    >
      {/* Brand */}
      <div style={s.brand}>
        <div style={s.logoWrap}>
          <img src={config.brand.logo} alt={config.brand.name} style={s.logo} />
        </div>
        {!isCollapsed && (
          <div style={s.brandTextWrap}>
            <span style={s.brandName}>Cámara de</span>
            <span style={s.brandSub}>Diputados</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={s.divider} />

      {/* Sistema Label */}
      {!isCollapsed && (
        <span style={s.sectionLabel}>Sistema de Seguridad</span>
      )}

      {/* Nav */}
      <nav style={s.nav}>
        {nav.map(item => renderLink(item, isCollapsed))}
      </nav>

      {/* Footer */}
      <div style={{ marginTop: 'auto' }}>
        <div style={s.divider} />
        {!isCollapsed && (
          <div style={s.footer}>
            <div style={s.statusRow}>
              <span style={s.statusDot} />
              <span style={s.footerText}>Sistema Activo · LXVI Legislatura</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

/* ── Styles — Sidebar oscuro institucional ──────────────────────── */
const s = {
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '18px 14px 14px',
    flexShrink: 0,
  },
  logoWrap: {
    width: 38, height: 38,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 3,
  },
  logo: { width: 32, height: 32, objectFit: 'contain', filter: 'brightness(1.2)' },
  brandTextWrap: {
    display: 'flex', flexDirection: 'column', lineHeight: 1.15,
  },
  brandName: {
    fontWeight: 700, fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: '-0.01em',
  },
  brandSub: {
    fontWeight: 800, fontSize: 15,
    color: '#D6D989',
    letterSpacing: '-0.02em',
  },
  divider: {
    height: 1,
    background: 'linear-gradient(to right, transparent, rgba(214,217,137,0.15), transparent)',
    margin: '4px 12px',
  },
  sectionLabel: {
    display: 'block',
    fontSize: 9,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.10em',
    padding: '10px 16px 6px',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '4px 8px',
    flex: 1,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 8px',
    borderRadius: 'var(--radius)',
    color: 'rgba(255,255,255,0.60)',
    transition: 'background 0.15s, color 0.15s',
    position: 'relative',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  linkActive: {
    background: 'rgba(2, 115, 94, 0.35)',
    color: 'rgba(255,255,255,0.95)',
    borderLeft: '2px solid #D6D989',
  },
  iconWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    width: 20, height: 20,
    transition: 'color 0.15s',
  },
  linkLabel: {
    fontSize: 13.5,
    fontWeight: 500,
    transition: 'opacity 0.2s',
    flex: 1,
    color: 'inherit',
  },
  activeDot: {
    width: 5, height: 5,
    borderRadius: '50%',
    background: '#D6D989',
    flexShrink: 0,
    boxShadow: '0 0 8px #D6D989',
  },
  alertBadge: {
    minWidth: 18, height: 18,
    borderRadius: 9,
    background: '#C53030',
    color: '#fff',
    fontSize: 10,
    fontWeight: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0 5px',
    flexShrink: 0,
    boxShadow: '0 0 8px rgba(197,48,48,0.5)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  alertBadgeMini: {
    width: 7, height: 7,
    borderRadius: '50%',
    background: '#C53030',
    position: 'absolute',
    top: 6, right: 6,
    boxShadow: '0 0 6px rgba(197,48,48,0.8)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  hidden: { opacity: 0, width: 0, overflow: 'hidden', pointerEvents: 'none' },
  footer: { padding: '10px 14px 14px' },
  statusRow: { display: 'flex', alignItems: 'center', gap: 6 },
  statusDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#D6D989',
    boxShadow: '0 0 6px #D6D989',
    animation: 'dotPulse 2s ease-in-out infinite',
    flexShrink: 0,
  },
  footerText: { fontSize: 10.5, color: 'rgba(255,255,255,0.40)', lineHeight: 1.3 },
}
