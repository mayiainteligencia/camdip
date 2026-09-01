import { NavLink } from 'react-router-dom'
import config from '@/config/config'
import { useVoiceAssistant } from '@/components/ui/Jarvis'

/* Floating bottom nav para móvil. Centro = logo Cámara → Comando Central. */

const IconComando = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    <path d="M7 8h10M7 12h4"/>
  </svg>
)
const IconVigilancia = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)
const IconAlertas = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const IconSeguridad = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconMic = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
)

const items = [
  { to: '/vigilancia', label: 'Vigilancia', Icon: IconVigilancia },
  { to: '/alertas',    label: 'Alertas',    Icon: IconAlertas    },
  { to: '/seguridad',  label: 'Seguridad',  Icon: IconSeguridad  },
]

export default function MobileNav() {
  const { listening, start } = useVoiceAssistant()

  return (
    <nav style={s.bar} aria-label="Navegación móvil">
      {/* 2 ítems a la izquierda del logo */}
      {items.slice(0, 2).map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} title={label} style={linkStyle}>
          {({ isActive }) => <span style={iconWrap(isActive)}><Icon /></span>}
        </NavLink>
      ))}

      {/* Centro: logo Cámara → Comando Central */}
      <NavLink to="/" end title="Comando Central" style={s.logoLink}>
        {({ isActive }) => (
          <span style={{ ...s.logoBtn, boxShadow: isActive ? '0 6px 18px rgba(2,115,94,0.40)' : '0 4px 14px rgba(0,0,0,0.18)' }}>
            <img src={config.brand.logo} alt="Comando Central" style={s.logoImg} />
          </span>
        )}
      </NavLink>

      {/* Ítem derecho */}
      {items.slice(2).map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} title={label} style={linkStyle}>
          {({ isActive }) => <span style={iconWrap(isActive)}><Icon /></span>}
        </NavLink>
      ))}

      {/* Asistente de voz */}
      <button onClick={start} title="Jarvis — Asistente de Voz" aria-label="Asistente de voz" style={s.micBtn}>
        <span style={iconWrap(listening)}><IconMic /></span>
      </button>
    </nav>
  )
}

const linkStyle = { display: 'flex', textDecoration: 'none' }
const iconWrap = (active) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 44, height: 44, borderRadius: 14,
  color: active ? '#02735E' : '#718096',
  background: active ? 'rgba(2,115,94,0.10)' : 'transparent',
  transition: 'color 0.15s, background 0.15s',
})

const s = {
  bar: {
    position: 'fixed',
    left: '50%', bottom: 14, transform: 'translateX(-50%)',
    zIndex: 200,
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '6px 10px',
    background: 'rgba(255,255,255,0.96)',
    border: '1px solid rgba(2,115,94,0.12)',
    borderRadius: 999,
    boxShadow: '0 8px 30px rgba(0,0,0,0.14)',
    backdropFilter: 'blur(20px)',
  },
  logoLink: { display: 'flex', margin: '0 2px', textDecoration: 'none' },
  logoBtn: {
    width: 56, height: 56, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#08261E',
    border: '2px solid #02735E',
    marginTop: -22,
  },
  logoImg: { width: 40, height: 40, objectFit: 'contain', filter: 'brightness(1.3)' },
  micBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' },
}
