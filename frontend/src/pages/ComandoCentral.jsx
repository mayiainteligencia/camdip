import { useEffect, useState } from 'react'
import { JarvisPanel } from '@/components/ui/Jarvis'
import { MayiaPanel } from '@/components/ui/Mayia'
import { ALERTS, BUILDING_ZONES, getDashboardKPIs, getRecentActivity } from '@/data/securityData'
import ubicacion from '@/assets/ubicacion.jpeg'
import { 
  IconFire, IconUser, IconCar, IconMegaphone, IconCamera, IconBox, 
  IconHospital, IconBag, IconAlert, IconCheck, IconCircle, IconCircleDot 
} from '@/components/ui/Icons'

/* ── Helpers ──────────────────────────────────────────────────────── */
const ALERT_ICONS = {
  fire:       <IconFire size={15}/>, 
  suspect:    <IconUser size={15}/>, 
  vehicle:    <IconCar size={15}/>,
  protest:    <IconMegaphone size={15}/>, 
  camera:     <IconCamera size={15}/>, 
  extraction: <IconBox size={15}/>,
  medical:    <IconHospital size={15}/>, 
  forgotten:  <IconBag size={15}/>, 
  accident:   <IconAlert size={15}/>,
}
const SEVERITY_CFG = {
  critical: { color: '#C53030', bg: 'rgba(197,48,48,0.08)',  label: 'Crítica',  dot: '#C53030' },
  high:     { color: '#C05621', bg: 'rgba(192,86,33,0.08)',  label: 'Alta',     dot: '#C05621' },
  medium:   { color: '#B7791F', bg: 'rgba(183,121,31,0.08)', label: 'Media',    dot: '#B7791F' },
  low:      { color: '#2F855A', bg: 'rgba(47,133,90,0.08)',  label: 'Baja',     dot: '#2F855A' },
}
const ACTIVITY_COLORS = {
  fire: '#C53030', suspect: '#702459', vehicle: '#C05621',
  protest: '#C05621', camera: '#B7791F', provider: '#02735E',
  forgotten: '#2B6CB0', medical: '#2B6CB0',
}
const DECISION_ICONS = { 
  a: <IconCircle size={12} color="#02735E" />, 
  b: <IconCircle size={12} color="#B7791F" />, 
  c: <IconCircle size={12} color="#718096" /> 
}
const KPI_COLORS = {
  yellow: { bg: 'rgba(183,121,31,0.08)', accent: '#B7791F' },
  red:    { bg: 'rgba(197,48,48,0.08)',  accent: '#C53030' },
  orange: { bg: 'rgba(192,86,33,0.08)',  accent: '#C05621' },
  green:  { bg: 'rgba(2,115,94,0.08)',   accent: '#02735E' },
}

/* ── Sparkline ─────────────────────────────────────────────────────── */
function Sparkline({ color, values = [2,5,3,7,4,6,8] }) {
  const w = 80, h = 28
  const max = Math.max(...values), min = Math.min(...values)
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(' ').at(-1).split(',')[0]} cy={pts.split(' ').at(-1).split(',')[1]} r="2.5" fill={color} />
    </svg>
  )
}

/* ── Alert Item ────────────────────────────────────────────────────── */
function AlertItem({ alert, idx }) {
  const cfg = SEVERITY_CFG[alert.severity] ?? SEVERITY_CFG.low
  return (
    <div style={{
      ...sa.item, background: cfg.bg,
      borderLeft: `3px solid ${cfg.dot}`,
      animationDelay: `${idx * 70}ms`,
    }}>
      <div style={sa.top}>
        <span style={{ fontSize: 13, display: 'flex', alignItems: 'center' }}>{ALERT_ICONS[alert.type] ?? <IconAlert size={14}/>}</span>
        <span style={{ ...sa.badge, color: cfg.color, background: `${cfg.dot}15` }}>{cfg.label}</span>
        <span style={sa.time}>{alert.time}</span>
        {alert.status === 'active' && <span style={sa.activePip} />}
      </div>
      <p style={sa.title}>{alert.title}</p>
      <p style={sa.zone}>{alert.zone}</p>
    </div>
  )
}
const sa = {
  item: { borderRadius: 8, padding: '10px 12px', marginBottom: 7, border: '1px solid rgba(0,0,0,0.06)', animation: 'slideInLeft 0.4s ease both', cursor: 'default' },
  top:  { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 },
  badge: { fontSize: 9.5, fontWeight: 800, padding: '2px 7px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.06em' },
  time:  { fontSize: 10, color: '#A0AEC0', marginLeft: 'auto' },
  activePip: { width: 6, height: 6, borderRadius: '50%', background: '#C53030', animation: 'pulse 1.5s ease-in-out infinite', flexShrink: 0 },
  title: { fontSize: 12.5, color: '#1A202C', fontWeight: 600, lineHeight: 1.35, marginBottom: 3 },
  zone:  { fontSize: 10.5, color: '#718096' },
}

/* ── Decision Card ─────────────────────────────────────────────────── */
function DecisionCard({ dec, onDecide }) {
  const [chosen, setChosen] = useState(null)
  const cfg = dec.priority === 'critical' ? { border: '#C53030', bg: 'rgba(197,48,48,0.05)' }
            : dec.priority === 'high'     ? { border: '#C05621', bg: 'rgba(192,86,33,0.04)' }
            :                               { border: '#B7791F', bg: 'rgba(183,121,31,0.04)' }

  const decide = (opt) => {
    setChosen(opt.id)
    onDecide?.(dec, opt)
  }

  return (
    <div style={{ ...sd.card, borderColor: cfg.border, background: cfg.bg }}>
      <div style={sd.cardHead}>
        <span style={{ ...sd.priorityDot, background: cfg.border }} />
        <span style={{ ...sd.priorityLabel, color: cfg.border }}>{dec.priority === 'critical' ? 'CRÍTICO' : dec.priority === 'high' ? 'ALTO' : 'MEDIO'}</span>
        <span style={sd.cardTime}>{dec.time}</span>
      </div>
      <p style={sd.cardTitle}>{dec.title}</p>
      <p style={sd.cardCtx}>{dec.context}</p>
      {dec.mayiaReason && (
        <div style={sd.mayiaRec}>
          <span style={sd.mayiaDot}><IconCircleDot size={12} /></span>
          <span style={sd.mayiaText}>MAYIA: {dec.mayiaReason}</span>
        </div>
      )}
      <div style={sd.opts}>
        {dec.options.map(opt => (
          <button key={opt.id} onClick={() => decide(opt)} style={{
            ...sd.optBtn,
            background: chosen === opt.id ? opt.color : 'rgba(0,0,0,0.04)',
            color: chosen === opt.id ? '#fff' : opt.color,
            borderColor: opt.color,
            opacity: chosen && chosen !== opt.id ? 0.4 : 1,
          }}>
            {opt.label}
          </button>
        ))}
      </div>
      {chosen && <p style={sd.decided}><IconCheck size={12} style={{marginRight:4}} /> Decisión registrada · {dec.options.find(o=>o.id===chosen)?.label}</p>}
    </div>
  )
}
const sd = {
  card:          { border: '1px solid', borderRadius: 12, padding: '14px', marginBottom: 10, transition: 'box-shadow 0.2s' },
  cardHead:      { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 },
  priorityDot:   { width: 7, height: 7, borderRadius: '50%', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' },
  priorityLabel: { fontSize: 9, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase' },
  cardTime:      { fontSize: 10, color: '#A0AEC0', marginLeft: 'auto' },
  cardTitle:     { fontSize: 13, fontWeight: 800, color: '#1A202C', marginBottom: 5, lineHeight: 1.3 },
  cardCtx:       { fontSize: 11, color: '#4A5568', lineHeight: 1.5, marginBottom: 8 },
  mayiaRec:      { display: 'flex', gap: 6, alignItems: 'flex-start', background: 'rgba(2,115,94,0.06)', border: '1px solid rgba(2,115,94,0.15)', borderRadius: 8, padding: '6px 9px', marginBottom: 10 },
  mayiaDot:      { color: '#02735E', display: 'flex', alignItems: 'center', flexShrink: 0, marginTop: 1 },
  mayiaText:     { fontSize: 10.5, color: '#02735E', lineHeight: 1.5, fontWeight: 500 },
  opts:          { display: 'flex', flexDirection: 'column', gap: 5 },
  optBtn:        { border: '1px solid', borderRadius: 8, padding: '8px 12px', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' },
  decided:       { fontSize: 10.5, color: '#02735E', display: 'flex', alignItems: 'center', fontWeight: 700, marginTop: 8, padding: '5px 8px', background: 'rgba(2,115,94,0.06)', borderRadius: 6 },
}

/* ── KPI Card ──────────────────────────────────────────────────────── */
function KpiCard({ kpi, idx }) {
  const clr = KPI_COLORS[kpi.color] ?? KPI_COLORS.green
  return (
    <div style={{
      ...sk.card,
      background: clr.bg,
      border: `1px solid ${clr.accent}30`,
      animationDelay: `${idx * 80}ms`,
    }}>
      <span style={sk.label}>{kpi.label}</span>
      <div style={sk.row}>
        <span style={{ ...sk.value, color: clr.accent }}>{kpi.value}</span>
        <span style={{ ...sk.sub, color: clr.accent + 'aa' }}>{kpi.sub}</span>
      </div>
      <Sparkline color={clr.accent} values={[2,4,3,6,4,5,parseInt(kpi.value)||4]} />
    </div>
  )
}
const sk = {
  card:  { borderRadius: 10, padding: '12px 14px', animation: 'slideInRight 0.4s ease both', cursor: 'default' },
  label: { fontSize: 10.5, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 },
  row:   { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  value: { fontSize: 26, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' },
  sub:   { fontSize: 10.5, fontWeight: 600 },
}

/* ── Activity Item ─────────────────────────────────────────────────── */
function ActivityItem({ item, idx }) {
  const color = ACTIVITY_COLORS[item.type] ?? '#A0AEC0'
  return (
    <div style={{ ...sac.row, animationDelay: `${idx * 55}ms` }}>
      <div style={{ ...sac.dot, background: color }} />
      <div style={sac.info}>
        <span style={sac.action}>{item.action}</span>
        <span style={sac.meta}>{item.zone}</span>
      </div>
      <span style={sac.time}>{item.time}</span>
    </div>
  )
}
const sac = {
  row:    { display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', animation: 'fadeIn 0.5s ease both' },
  dot:    { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  info:   { flex: 1, minWidth: 0 },
  action: { display: 'block', fontSize: 12, color: '#1A202C', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  meta:   { fontSize: 10.5, color: '#718096' },
  time:   { fontSize: 10.5, color: '#A0AEC0', flexShrink: 0 },
}

/* ── Mapa del Edificio con Zona Pins ────────────────────────────────── */
function BuildingMap() {
  const [hovered, setHovered] = useState(null)
  const hoveredZone = BUILDING_ZONES.find(z => z.id === hovered)
  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}>
      <img src={ubicacion} alt="Ubicación Cámara de Diputados" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {/* Overlay oscuro suave */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,38,30,0.25)', pointerEvents: 'none' }} />
      {/* Zona hotspots */}
      {BUILDING_ZONES.map(zone => (
        <div
          key={zone.id}
          style={{
            position: 'absolute',
            left: `${zone.x}%`, top: `${zone.y}%`,
            transform: 'translate(-50%,-50%)',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onMouseEnter={() => setHovered(zone.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            width: zone.alerts > 0 ? 16 : 11,
            height: zone.alerts > 0 ? 16 : 11,
            borderRadius: '50%',
            background: zone.alerts > 0 ? '#C53030' : '#02735E',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: zone.alerts > 0 ? '0 0 12px rgba(197,48,48,0.7)' : '0 0 8px rgba(2,115,94,0.6)',
            animation: zone.alerts > 0 ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }} />
        </div>
      ))}
      {/* Tooltip de zona */}
      {hoveredZone && (
        <div style={{
          position: 'absolute',
          left: `${hoveredZone.x}%`, top: `${hoveredZone.y - 10}%`,
          transform: 'translate(-50%, -100%)',
          background: 'rgba(8,38,30,0.95)',
          color: '#fff', fontSize: 11, fontWeight: 700,
          padding: '5px 10px', borderRadius: 8,
          whiteSpace: 'nowrap', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 4,
          border: '1px solid rgba(2,115,94,0.4)',
          pointerEvents: 'none',
        }}>
          {hoveredZone.name}
          {hoveredZone.alerts > 0 && <span style={{ color: '#C53030', display: 'flex', alignItems: 'center', gap: 4 }}><IconAlert size={12}/> {hoveredZone.alerts}</span>}
        </div>
      )}
      {/* Label institucional */}
      <div style={{ position: 'absolute', bottom: 10, left: 12, background: 'rgba(8,38,30,0.85)', borderRadius: 8, padding: '4px 10px', border: '1px solid rgba(214,217,137,0.20)' }}>
        <span style={{ fontSize: 10, color: '#D6D989', fontWeight: 700, letterSpacing: '0.06em' }}>H. CÁMARA DE DIPUTADOS · SAN LÁZARO, CDMX</span>
      </div>
    </div>
  )
}

/* ── Hook responsive ─────────────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function ComandoCentral() {
  const [kpis,     setKpis]     = useState([])
  const [activity, setActivity] = useState([])
  const [decisions, setDecisions] = useState([])
  const windowWidth = useWindowWidth()
  const isTablet = windowWidth <= 1100
  const isMobileView = windowWidth <= 768

  useEffect(() => {
    getDashboardKPIs().then(setKpis)
    getRecentActivity().then(setActivity)
    // Cargar decisiones desde securityData
    import('@/data/securityData').then(m => setDecisions(m.DECISIONS.slice(0, 3)))
  }, [])

  const activeAlerts = ALERTS.filter(a => a.status === 'active' || a.status === 'monitoring')

  return (
    <div style={{ height: isTablet ? 'auto' : '100%', display: 'flex', flexDirection: 'column' }}>

      {/* ── Grid HUD: 3 columnas ──────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobileView ? '1fr' : isTablet ? '1fr' : 'minmax(270px,1fr) 2.2fr minmax(270px,1fr)',
        gap: 10,
        flex: 1,
        minHeight: 0,
        alignItems: 'start',
      }}>

        {/* ══ Columna Izquierda — Alertas Activas ══ */}
        <aside className="hud-panel hud-red" style={{
          display: 'flex', flexDirection: 'column', padding: 14,
          animation: 'slideInLeft 0.5s ease both',
          maxHeight: isTablet ? 'none' : 'calc(100vh - 88px)',
          overflow: isTablet ? 'visible' : 'hidden',
          position: 'relative',
        }}>
          <span className="hud-corner tl" style={{ borderColor: '#C53030' }} />
          <span className="hud-corner tr" />
          <span className="hud-corner bl" />
          <span className="hud-corner br" style={{ borderColor: '#C53030' }} />

          <div style={sc.colHeader}>
            <span style={sc.colTitle}>Alertas Activas</span>
            <span style={{ ...sc.badge, background: 'rgba(197,48,48,0.12)', color: '#C53030' }}>
              {activeAlerts.length}
            </span>
          </div>

          <div style={{ overflowY: isTablet ? 'visible' : 'auto', flex: 1 }}>
            {activeAlerts.map((a, i) => <AlertItem key={a.id} alert={a} idx={i} />)}
          </div>
        </aside>

        {/* ══ Columna Central — Mapa del Edificio ══ */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Header */}
          <div style={sc.mapHeader}>
            <div>
              <h2 style={sc.mapTitle}>Centro de Operaciones</h2>
              <p style={sc.mapSub}>H. Cámara de Diputados, San Lázaro · Monitoreo en tiempo real</p>
            </div>
            <div style={sc.mapLegend}>
              <span style={sc.legendItem}><span style={{ ...sc.legendDot, background: '#C53030', boxShadow: '0 0 5px #C53030' }} />Alertas</span>
              <span style={sc.legendItem}><span style={{ ...sc.legendDot, background: '#02735E', boxShadow: '0 0 5px #02735E' }} />Zonas OK</span>
            </div>
          </div>

          {/* Mapa satelital */}
          <div className="hud-panel" style={{ padding: 10, position: 'relative' }}>
            <span className="hud-corner tl" />
            <span className="hud-corner tr" />
            <span className="hud-corner bl" />
            <span className="hud-corner br" />
            <BuildingMap />
          </div>

          {/* Actividad reciente */}
          <div className="hud-panel" style={{ padding: 14, position: 'relative' }}>
            <span className="hud-corner tl" />
            <span className="hud-corner br" />
            <div style={sc.colHeader}>
              <span style={sc.colTitle}>Actividad Reciente</span>
              <span style={sc.liveTag}>● LIVE</span>
            </div>
            {activity.map((a, i) => <ActivityItem key={a.id} item={a} idx={i} />)}
          </div>
        </section>

        {/* ══ Columna Derecha — IA + Decisiones + KPIs ══ */}
        <aside className="hud-panel hud-green" style={{
          display: 'flex', flexDirection: 'column', padding: 14,
          animation: 'slideInRight 0.5s ease both',
          maxHeight: isTablet ? 'none' : 'calc(100vh - 88px)',
          overflowY: isTablet ? 'visible' : 'auto',
          position: 'relative',
        }}>
          <span className="hud-corner tl" style={{ borderColor: '#D6D989' }} />
          <span className="hud-corner tr" />
          <span className="hud-corner bl" />
          <span className="hud-corner br" />

          {/* Jarvis */}
          <JarvisPanel mapData={[]} alerts={activeAlerts} />

          {/* MAYIA */}
          <MayiaPanel section="dashboard" title="MAYIA · Seguridad" />

          {/* Decisiones pendientes */}
          <div style={sc.colHeader}>
            <span style={sc.colTitle}>Decisiones Pendientes</span>
            <span style={{ ...sc.badge, background: 'rgba(197,48,48,0.10)', color: '#C53030' }}>{decisions.length}</span>
          </div>
          <p style={{ fontSize: 10.5, color: '#718096', marginBottom: 10, lineHeight: 1.5 }}>
            Situaciones que requieren tu autorización inmediata.
          </p>
          {decisions.map(dec => (
            <DecisionCard key={dec.id} dec={dec} onDecide={(d, opt) => console.log('Decisión:', d.title, '→', opt.label)} />
          ))}

          {/* KPIs */}
          <div style={sc.colHeader}>
            <span style={sc.colTitle}>Estado del Sistema</span>
            <span style={{ fontSize: 10, color: '#A0AEC0' }}>Tiempo real</span>
          </div>
          {kpis.map((k, i) => <KpiCard key={k.id} kpi={k} idx={i} />)}
        </aside>

      </div>
    </div>
  )
}

/* ── Estilos ───────────────────────────────────────────────────────── */
const sc = {
  colHeader:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0 },
  colTitle:   { fontSize: 12, fontWeight: 800, color: '#1A202C', textTransform: 'uppercase', letterSpacing: '0.06em' },
  badge:      { fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 10 },
  liveTag:    { fontSize: 9.5, color: '#02735E', fontWeight: 800, letterSpacing: '0.05em', animation: 'blink 2s ease-in-out infinite' },
  mapHeader:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' },
  mapTitle:   { fontSize: 17, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em', marginBottom: 3 },
  mapSub:     { fontSize: 11.5, color: '#718096' },
  mapLegend:  { display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: '#4A5568', fontWeight: 600 },
  legendDot:  { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
}
