import { useAuth } from '@/auth'
import config from '@/config/config'
import { useNavigate } from 'react-router-dom'
import { IconUser, IconAlert, IconCircleDot } from '@/components/ui/Icons'

export default function Configuracion() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login', { replace: true }) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700 }}>

      {/* Header */}
      <div>
        <p style={sc.kicker}>Sistema</p>
        <h2 style={sc.title}>Configuración</h2>
        <p style={sc.sub}>Centro de Comando · H. Cámara de Diputados · LXVI Legislatura</p>
      </div>

      {/* Sesión activa */}
      <div className="hud-panel" style={{ padding: '20px 22px' }}>
        <span className="hud-corner tl" style={{ borderColor: '#D6D989' }} />
        <p style={sc.sHead}>Sesión Activa</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #02735E, #08261E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>
            <IconUser />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#1A202C' }}>{user?.email ?? 'Usuario'}</div>
            <div style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>Acceso completo · LXVI Legislatura</div>
            <div style={{ fontSize: 11, color: '#A0AEC0', marginTop: 1 }}>
              Sesión iniciada: {user?.ts ? new Date(user.ts).toLocaleString('es-MX') : '—'}
            </div>
          </div>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', padding: '8px 18px', borderRadius: 10, border: '1.5px solid rgba(197,48,48,0.30)', background: 'rgba(197,48,48,0.06)', color: '#C53030', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Sobre el sistema */}
      <div className="hud-panel" style={{ padding: '20px 22px' }}>
        <span className="hud-corner tl" />
        <p style={sc.sHead}>Acerca del Sistema</p>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img src={config.brand.logo} alt="Cámara de Diputados" style={{ height: 50, width: 'auto', objectFit: 'contain' }} />
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#1A202C', marginBottom: 4 }}>Centro de Comando Inteligente</p>
            <p style={{ fontSize: 12, color: '#718096', lineHeight: 1.6, maxWidth: 480 }}>
              Sistema integral de vigilancia, seguridad, alertas, protocolos de emergencia y toma de decisiones estratégicas para la H. Cámara de Diputados del Congreso de la Unión, LXVI Legislatura.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              {[
                { k: 'Versión', v: '3.0.0' },
                { k: 'Entorno', v: 'Demo Mockup' },
                { k: 'Último sync', v: new Date().toLocaleTimeString('es-MX') },
              ].map(({ k, v }) => (
                <div key={k} style={{ background: 'rgba(2,115,94,0.06)', border: '1px solid rgba(2,115,94,0.15)', borderRadius: 8, padding: '5px 12px' }}>
                  <div style={{ fontSize: 9.5, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#02735E' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Paleta de colores institucional */}
      <div className="hud-panel" style={{ padding: '20px 22px' }}>
        <span className="hud-corner tr" style={{ borderColor: '#D6D989' }} />
        <p style={sc.sHead}>Identidad Institucional</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { name: 'Verde Principal',    hex: '#02735E' },
            { name: 'Verde Oscuro',       hex: '#08261E' },
            { name: 'Verde Medio',        hex: '#36594F' },
            { name: 'Dorado Institucional', hex: '#D6D989' },
            { name: 'Fondo',             hex: '#F2F2F2' },
          ].map(({ name, hex }) => (
            <div key={hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: hex, border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
              <div style={{ fontSize: 10, color: '#4A5568', fontWeight: 700, textAlign: 'center', maxWidth: 56, lineHeight: 1.3 }}>{name}</div>
              <div style={{ fontSize: 9, color: '#A0AEC0', fontFamily: 'monospace' }}>{hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado del sistema */}
      <div className="hud-panel" style={{ padding: '20px 22px' }}>
        <p style={sc.sHead}>Estado del Sistema</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'CCTV / Videovigilancia',   status: 'Operativo (87.5%)',   ok: true  },
            { label: 'Sistema de Alertas',        status: 'Activo · 8 alertas',  ok: true  },
            { label: 'Control de Proveedores',    status: 'Activo · 1 incidente',ok: false },
            { label: 'Protocolos de Emergencia',  status: 'Standby',             ok: true  },
            { label: 'Sistema contra Incendios',  status: '1 zona en alerta',    ok: false },
            { label: 'Asistente IA (MAYIA+Jarvis)',status: 'Activo',             ok: true  },
          ].map(({ label, status, ok }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: 13, color: '#1A202C', fontWeight: 600 }}>{label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, color: ok ? '#02735E' : '#C53030', background: ok ? 'rgba(2,115,94,0.08)' : 'rgba(197,48,48,0.08)', padding: '3px 10px', borderRadius: 10 }}>
                {ok ? <IconCircleDot size={12}/> : <IconAlert size={12}/>} {status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

const sc = {
  kicker: { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:  { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:    { fontSize: 13, color: '#718096', marginTop: 2 },
  sHead:  { fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 14 },
}
