import { useState } from 'react'
import { PROVIDERS, PLATE_LOG } from '@/data/securityData'
import { MayiaPanel } from '@/components/ui/Mayia'
import { IconAlert, IconCheck, IconCircle, IconCircleDot } from '@/components/ui/Icons'

/* ── Config estatus ────────────────────────────────────────────────── */
const STATUS = {
  inside:   { label: 'En sitio',      color: '#02735E', bg: 'rgba(2,115,94,0.10)'    },
  exited:   { label: 'Salió',         color: '#718096', bg: 'rgba(0,0,0,0.06)'       },
  expected: { label: 'Esperado',      color: '#2B6CB0', bg: 'rgba(43,108,176,0.10)'  },
  delayed:  { label: 'Retrasado',     color: '#B7791F', bg: 'rgba(183,121,31,0.10)'  },
  alert:    { label: 'No autorizado', color: '#C53030', bg: 'rgba(197,48,48,0.10)'   },
}

/* ── Fila de proveedor ─────────────────────────────────────────────── */
function ProviderRow({ p, idx }) {
  const sc = STATUS[p.status] ?? STATUS.expected
  const isAlert = p.status === 'alert'
  return (
    <tr style={{ background: isAlert ? 'rgba(197,48,48,0.04)' : 'transparent', animation: `slideInUp 0.35s ease both`, animationDelay: `${idx * 50}ms` }}>
      <td style={sp.td}>
        <span style={{ fontWeight: 700, fontSize: 13, color: '#1A202C', display: 'block' }}>{p.name}</span>
        <span style={{ fontSize: 11, color: '#718096' }}>{p.company}</span>
      </td>
      <td style={sp.td}>
        <span style={{ fontSize: 11.5, color: '#4A5568', background: 'rgba(0,0,0,0.04)', padding: '3px 8px', borderRadius: 6 }}>{p.type}</span>
      </td>
      <td style={sp.td}>
        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 12.5, color: isAlert ? '#C53030' : '#1A202C', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
          {isAlert && <IconAlert size={12}/>}{p.plate}
        </span>
      </td>
      <td style={sp.td}>
        <span style={{ fontSize: 11.5, color: '#4A5568' }}>{p.schedule}</span>
      </td>
      <td style={sp.td}>
        <span style={{ fontSize: 11.5, color: p.checkedIn ? '#02735E' : '#A0AEC0' }}>
          {p.checkedIn ?? '—'}
        </span>
      </td>
      <td style={sp.td}>
        <span style={{ fontSize: 11.5, color: p.checkedOut ? '#718096' : '#A0AEC0' }}>
          {p.checkedOut ?? (p.status === 'inside' ? 'En sitio' : '—')}
        </span>
      </td>
      <td style={sp.td}>
        <span style={{ ...sc, fontSize: 10.5, fontWeight: 800, padding: '3px 10px', borderRadius: 12, display: 'inline-block' }}>
          {sc.label}
        </span>
      </td>
      <td style={sp.td}>
        {isAlert && (
          <button style={sp.actionBtn}>
            Verificar
          </button>
        )}
      </td>
    </tr>
  )
}

/* ── Barra de acceso (mini timeline) ──────────────────────────────── */
function AccessTimeline({ providers }) {
  const withEntry = providers.filter(p => p.checkedIn)
  return (
    <div style={{ position: 'relative', paddingTop: 12, paddingBottom: 4 }}>
      {/* Línea de tiempo */}
      <div style={{ position: 'relative', height: 40 }}>
        {/* Barra base */}
        <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 2, background: 'rgba(2,115,94,0.15)', borderRadius: 1 }} />
        {/* Puntos de acceso */}
        {withEntry.map((p, i) => {
          const [h, m] = (p.checkedIn || '07:00').split(':').map(Number)
          const pct = Math.min(100, Math.max(0, ((h * 60 + m) - 6 * 60) / (12 * 60) * 100))
          const sc = STATUS[p.status] ?? STATUS.expected
          return (
            <div key={p.id} style={{ position: 'absolute', left: `${pct}%`, top: 0, transform: 'translateX(-50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 7.5, color: '#718096', marginBottom: 2, whiteSpace: 'nowrap' }}>{p.checkedIn}</div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: sc.color, boxShadow: `0 0 6px ${sc.color}80`, margin: '0 auto 3px' }} />
              <div style={{ fontSize: 7, color: '#718096', maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.company.split(' ')[0]}</div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map(t => (
          <span key={t} style={{ fontSize: 9, color: '#A0AEC0' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Seguridad() {
  const [plateSearch, setPlateSearch] = useState('')
  const [plateResult, setPlateResult] = useState(null)

  const handlePlate = e => {
    e.preventDefault()
    const found = PLATE_LOG.find(p => p.plate.toLowerCase().replace(/[-\s]/g,'') === plateSearch.toLowerCase().replace(/[-\s]/g,''))
    setPlateResult(found ?? { plate: plateSearch, status: 'unknown', provider: 'No registrada', type: '—', time: '—' })
  }

  const inSite  = PROVIDERS.filter(p => p.status === 'inside').length
  const alerts  = PROVIDERS.filter(p => p.status === 'alert').length
  const exited  = PROVIDERS.filter(p => p.status === 'exited').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={ss.kicker}>Control de Acceso</p>
          <h2 style={ss.title}>Seguridad y Proveedores</h2>
          <p style={ss.sub}>Registro de accesos, placas y proveedores autorizados · Hoy</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ ...ss.chip, background: 'rgba(2,115,94,0.08)', borderColor: 'rgba(2,115,94,0.20)', color: '#02735E' }}>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{inSite}</span>
            <span style={{ fontSize: 9.5 }}>En sitio</span>
          </div>
          <div style={{ ...ss.chip, background: 'rgba(197,48,48,0.08)', borderColor: 'rgba(197,48,48,0.20)', color: '#C53030' }}>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{alerts}</span>
            <span style={{ fontSize: 9.5 }}>Alertas</span>
          </div>
          <div style={{ ...ss.chip, background: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.12)', color: '#718096' }}>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{exited}</span>
            <span style={{ fontSize: 9.5 }}>Salieron</span>
          </div>
        </div>
      </div>

      <MayiaPanel section="seguridad" title="MAYIA · Seguridad" />

      {/* Timeline de accesos */}
      <div className="hud-panel lift" style={{ padding: 16 }}>
        <span className="hud-corner tl" />
        <span className="hud-corner br" />
        <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 12 }}>
          Línea de Tiempo de Accesos (06:00 – 18:00)
        </p>
        <AccessTimeline providers={PROVIDERS} />
      </div>

      {/* Tabla de proveedores */}
      <div className="hud-panel" style={{ overflow: 'auto' }}>
        <span className="hud-corner tl" style={{ borderColor: '#D6D989' }} />
        <div style={{ padding: '16px 16px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 14 }}>
            Proveedores del Día
          </p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'rgba(2,115,94,0.04)', borderBottom: '1px solid rgba(2,115,94,0.10)' }}>
              {['Proveedor', 'Tipo', 'Placa', 'Horario Autorizado', 'Ingresó', 'Salió', 'Estado', ''].map(h => (
                <th key={h} style={sp.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((p, i) => <ProviderRow key={p.id} p={p} idx={i} />)}
          </tbody>
        </table>
      </div>

      {/* Buscador de placas + alerta de extracción */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>

        {/* Verificador */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <p style={ss.sHead}>Verificador de Placas</p>
          <form onSubmit={handlePlate} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input value={plateSearch} onChange={e => setPlateSearch(e.target.value)} placeholder="Ej: TXR-45-K" style={ss.plateInput} />
            <button type="submit" style={ss.plateBtn}>Verificar</button>
          </form>
          {plateResult && (() => {
            const color = { authorized: '#02735E', unknown: '#C53030', expected: '#2B6CB0', delayed: '#B7791F' }[plateResult.status] ?? '#718096'
            const label = { 
              authorized: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconCheck size={14}/> Autorizada</span>, 
              unknown: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconAlert size={14}/> Desconocida</span>, 
              expected: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconCircle size={14}/> Esperada</span>, 
              delayed: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconAlert size={14}/> Retrasada</span> 
            }[plateResult.status] ?? '—'
            return (
              <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 10, padding: '12px 16px', animation: 'slideInUp 0.25s ease' }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 18, color: '#1A202C', marginBottom: 6 }}>{plateResult.plate}</div>
                <div style={{ fontSize: 13, color, fontWeight: 800, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11.5, color: '#718096' }}>{plateResult.provider} · {plateResult.type}</div>
                {plateResult.status === 'unknown' && (
                  <button style={{ ...ss.alertButton, marginTop: 12 }}>Activar Alerta de Vehículo</button>
                )}
              </div>
            )
          })()}
        </div>

        {/* Alerta de extracción no autorizada */}
        <div className="hud-panel lift hud-red" style={{ padding: 16 }}>
          <span className="hud-corner tl" style={{ borderColor: '#C53030' }} />
          <p style={{ ...ss.sHead, color: '#C53030', display: 'flex', alignItems: 'center', gap: 6 }}><IconAlert size={14}/> Detección de Extracción No Autorizada</p>
          <div style={{ background: 'rgba(197,48,48,0.06)', borderRadius: 10, padding: '12px 14px', marginBottom: 12, border: '1px solid rgba(197,48,48,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C53030', animation: 'pulse 1.5s infinite', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: '#C53030' }}>Acceso Sur — 09:44</span>
            </div>
            <p style={{ fontSize: 12, color: '#2D3748', lineHeight: 1.6, marginBottom: 10 }}>
              Cámara detectó salida de cajas sin registro en sistema. Proveedor de limpieza salió con material no documentado.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...ss.alertButton, flex: 1 }}>Retener y verificar</button>
              <button style={{ ...ss.outlineButton, flex: 1 }}>Ver grabación</button>
            </div>
          </div>
          <div style={{ fontSize: 10.5, color: '#718096', lineHeight: 1.5 }}>
            El sistema registra automáticamente cualquier salida de material que no coincida con la declaración de entrada del proveedor.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Estilos ───────────────────────────────────────────────────────── */
const ss = {
  kicker:      { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:       { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:         { fontSize: 13, color: '#718096', marginTop: 2 },
  chip:        { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 18px', borderRadius: 12, border: '1px solid', fontWeight: 600 },
  sHead:       { fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 12 },
  plateInput:  { flex: 1, height: 42, padding: '0 14px', borderRadius: 10, border: '1.5px solid rgba(2,115,94,0.20)', background: 'rgba(2,115,94,0.03)', fontSize: 14, fontFamily: 'monospace', color: '#1A202C', outline: 'none' },
  plateBtn:    { height: 42, padding: '0 16px', borderRadius: 10, border: 'none', background: '#08261E', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 },
  alertButton: { padding: '8px 14px', borderRadius: 8, border: 'none', background: '#C53030', color: '#fff', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' },
  outlineButton: { padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(197,48,48,0.30)', background: 'transparent', color: '#C53030', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' },
}
const sp = {
  th: { padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 800, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' },
  td: { padding: '12px 14px', borderBottom: '1px solid rgba(0,0,0,0.05)', verticalAlign: 'middle' },
  actionBtn: { padding: '6px 14px', borderRadius: 8, border: '1.5px solid #C53030', background: 'rgba(197,48,48,0.06)', color: '#C53030', fontSize: 11.5, fontWeight: 700, cursor: 'pointer' },
}
