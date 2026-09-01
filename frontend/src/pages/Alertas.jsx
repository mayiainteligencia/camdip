import { useState } from 'react'
import { ALERTS } from '@/data/securityData'
import { MayiaPanel } from '@/components/ui/Mayia'
import { useConfirm } from '@/components/ui/ConfirmModal'
import { 
  IconFire, IconUser, IconCar, IconMegaphone, IconCamera, IconBox, 
  IconHospital, IconBag, IconAlert, IconChevronDown, IconChevronUp
} from '@/components/ui/Icons'

/* ── Config de tipos y severidades ────────────────────────────────── */
const TYPE_CFG = {
  fire:       { label: 'Incendio',         icon: <IconFire size={22} />, color: '#C53030' },
  suspect:    { label: 'Sospechoso',       icon: <IconUser size={22} />, color: '#702459' },
  vehicle:    { label: 'Vehículo',         icon: <IconCar size={22} />, color: '#C05621' },
  protest:    { label: 'Manifestación',    icon: <IconMegaphone size={22} />, color: '#B7791F' },
  camera:     { label: 'Cámara',           icon: <IconCamera size={22} />, color: '#718096' },
  extraction: { label: 'Extracción',       icon: <IconBox size={22} />, color: '#C05621' },
  medical:    { label: 'Emergencia Méd.',  icon: <IconHospital size={22} />, color: '#2B6CB0' },
  forgotten:  { label: 'Obj. Olvidado',    icon: <IconBag size={22} />, color: '#2B6CB0' },
  accident:   { label: 'Accidente',        icon: <IconAlert size={22} />, color: '#C53030' },
}
const SEV_CFG = {
  critical: { label: 'Crítica', color: '#C53030', bg: 'rgba(197,48,48,0.09)', border: 'rgba(197,48,48,0.25)' },
  high:     { label: 'Alta',    color: '#C05621', bg: 'rgba(192,86,33,0.09)', border: 'rgba(192,86,33,0.25)' },
  medium:   { label: 'Media',   color: '#B7791F', bg: 'rgba(183,121,31,0.09)',border: 'rgba(183,121,31,0.20)' },
  low:      { label: 'Baja',    color: '#2F855A', bg: 'rgba(47,133,90,0.09)', border: 'rgba(47,133,90,0.20)' },
}
const FILTER_TYPES = ['todos', 'fire', 'suspect', 'vehicle', 'protest', 'camera', 'extraction', 'medical', 'forgotten']
const FILTER_SEV   = ['todas', 'critical', 'high', 'medium', 'low']

/* ── Tarjeta de alerta expandible ─────────────────────────────────── */
function AlertCard({ alert, idx, onAction }) {
  const [expanded, setExpanded] = useState(false)
  const tc = TYPE_CFG[alert.type] ?? { label: 'Alerta', icon: <IconAlert size={22} />, color: '#718096' }
  const sc = SEV_CFG[alert.severity] ?? SEV_CFG.medium

  return (
    <div style={{
      background: sc.bg,
      border: `1px solid ${sc.border}`,
      borderLeft: `4px solid ${sc.color}`,
      borderRadius: 12, padding: 16,
      animation: `slideInUp 0.4s ease both`,
      animationDelay: `${idx * 60}ms`,
      cursor: 'pointer',
    }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{tc.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1A202C' }}>{alert.title}</span>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: sc.color, background: `${sc.color}18`, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{sc.label}</span>
            {alert.status === 'active' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C53030', animation: 'pulse 1.5s infinite', flexShrink: 0 }} />}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10.5, color: '#718096' }}>Zona: {alert.zone}</span>
            <span style={{ fontSize: 10.5, color: '#718096' }}>Hora: {alert.time}</span>
            <span style={{ fontSize: 10.5, color: tc.color, fontWeight: 700 }}>{tc.label}</span>
          </div>
        </div>
        <span style={{ color: '#A0AEC0', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center' }}>
          {expanded ? <IconChevronUp size={16}/> : <IconChevronDown size={16}/>}
        </span>
      </div>

      {/* Expandido */}
      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 12.5, color: '#2D3748', lineHeight: 1.6, marginBottom: 14 }}>{alert.detail}</p>
          {alert.camera && (
            <p style={{ fontSize: 11, color: '#718096', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconCamera size={14}/> Cámara asociada: {alert.camera.toUpperCase()}
            </p>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {alert.protocol && (
              <button style={{ ...sb.actionBtn, background: '#08261E', color: '#fff', borderColor: '#08261E' }}
                onClick={e => { e.stopPropagation(); onAction(alert, 'protocol') }}>
                Activar Protocolo
              </button>
            )}
            <button style={{ ...sb.actionBtn, background: 'rgba(2,115,94,0.08)', color: '#02735E', borderColor: 'rgba(2,115,94,0.25)' }}
              onClick={e => { e.stopPropagation(); onAction(alert, 'team') }}>
              Enviar Equipo
            </button>
            <button style={{ ...sb.actionBtn, background: 'rgba(0,0,0,0.04)', color: '#718096', borderColor: 'rgba(0,0,0,0.12)' }}
              onClick={e => { e.stopPropagation(); onAction(alert, 'dismiss') }}>
              Desestimar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
const sb = {
  actionBtn: { padding: '8px 16px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' },
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Alertas() {
  const confirm = useConfirm()
  const [filterType, setFilterType] = useState('todos')
  const [filterSev,  setFilterSev]  = useState('todas')

  const filtered = ALERTS.filter(a => {
    if (filterType !== 'todos' && a.type !== filterType) return false
    if (filterSev  !== 'todas' && a.severity !== filterSev) return false
    return true
  })

  async function handleAction(alert, action) {
    if (action === 'dismiss') {
      await confirm({
        title: `¿Desestimar "${alert.title}"?`,
        description: 'Esta acción marcará la alerta como resuelta sin intervención. Queda registrada en el historial.',
        acceptLabel: 'Desestimar',
        discardLabel: 'Cancelar',
        tone: 'info',
      })
      return
    }
    if (action === 'protocol') {
      await confirm({
        title: `Activar protocolo para: ${alert.title}`,
        description: `Se iniciará el protocolo correspondiente. Se notificará al equipo de seguridad y se registrará la acción.`,
        acceptLabel: 'Activar protocolo',
        discardLabel: 'Cancelar',
        tone: 'danger',
      })
      return
    }
    if (action === 'team') {
      await confirm({
        title: `Enviar equipo a: ${alert.zone}`,
        description: `Se despachará al equipo de seguridad más cercano a ${alert.zone} para atender la situación.`,
        acceptLabel: 'Enviar equipo',
        discardLabel: 'Cancelar',
        tone: 'info',
      })
    }
  }

  const critical = ALERTS.filter(a => a.severity === 'critical' || a.severity === 'high').length
  const active   = ALERTS.filter(a => a.status === 'active').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={sal.kicker}>Sistema de Alerta</p>
          <h2 style={sal.title}>Centro de Alertas</h2>
          <p style={sal.sub}>H. Cámara de Diputados · {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ ...sal.chip, background: 'rgba(197,48,48,0.08)', borderColor: 'rgba(197,48,48,0.20)', color: '#C53030' }}>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{critical}</span>
            <span style={{ fontSize: 9.5 }}>Críticas/Altas</span>
          </div>
          <div style={{ ...sal.chip, background: 'rgba(2,115,94,0.08)', borderColor: 'rgba(2,115,94,0.15)', color: '#02735E' }}>
            <span style={{ fontWeight: 900, fontSize: 20 }}>{ALERTS.length}</span>
            <span style={{ fontSize: 9.5 }}>Total hoy</span>
          </div>
        </div>
      </div>

      <MayiaPanel section="alertas" title="MAYIA · Alertas" />

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={sal.filterGroup}>
          <span style={sal.filterLabel}>Tipo:</span>
          {FILTER_TYPES.map(t => (
            <button key={t} onClick={() => setFilterType(t)} style={{
              ...sal.filterBtn,
              ...(filterType === t ? { background: '#08261E', color: '#fff', borderColor: '#08261E' } : {})
            }}>
              <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
                {t === 'todos' ? 'Todos' : <>{TYPE_CFG[t]?.icon} {TYPE_CFG[t]?.label}</>}
              </span>
            </button>
          ))}
        </div>
        <div style={sal.filterGroup}>
          <span style={sal.filterLabel}>Severidad:</span>
          {FILTER_SEV.map(s => (
            <button key={s} onClick={() => setFilterSev(s)} style={{
              ...sal.filterBtn,
              ...(filterSev === s ? { background: SEV_CFG[s]?.color ?? '#08261E', color: '#fff', borderColor: SEV_CFG[s]?.color ?? '#08261E' } : {})
            }}>
              {s === 'todas' ? 'Todas' : SEV_CFG[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de alertas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0', fontSize: 13 }}>
            No hay alertas con los filtros seleccionados.
          </div>
        ) : (
          filtered.map((a, i) => <AlertCard key={a.id} alert={a} idx={i} onAction={handleAction} />)
        )}
      </div>
    </div>
  )
}

const sal = {
  kicker:      { fontSize: 10, fontWeight: 700, color: '#C53030', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:       { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:         { fontSize: 13, color: '#718096', marginTop: 2 },
  chip:        { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 18px', borderRadius: 12, border: '1px solid', fontWeight: 600 },
  filterGroup: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  filterLabel: { fontSize: 11, fontWeight: 700, color: '#718096', marginRight: 2 },
  filterBtn:   { fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.12)', background: '#fff', color: '#4A5568', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' },
}
