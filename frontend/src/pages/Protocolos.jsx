import { useState } from 'react'
import { PROTOCOLS, DECISIONS } from '@/data/securityData'
import { MayiaPanel } from '@/components/ui/Mayia'
import { 
  IconFire, IconUser, IconMegaphone, IconHospital, IconAlert, 
  IconChevronDown, IconChevronUp, IconCheck, IconCircle, IconCircleDot
} from '@/components/ui/Icons'

/* ── Protocol Icons ────────────────────────────────────────────────── */
const ProtocolIcons = {
  fire:       () => <IconFire size={22} />,
  protest:    () => <IconMegaphone size={22} />,
  medical:    () => <IconHospital size={22} />,
  intruder:   () => <IconUser size={22} />,
  evacuation: () => <IconAlert size={22} />,
}
const STATUS_LABEL = {
  standby:    { label: 'En espera',     color: '#718096', bg: 'rgba(0,0,0,0.06)'      },
  monitoring: { label: 'Monitoreando',  color: '#B7791F', bg: 'rgba(183,121,31,0.10)' },
  active:     { label: 'ACTIVO',        color: '#C53030', bg: 'rgba(197,48,48,0.10)'  },
}

/* ── Protocol Card ─────────────────────────────────────────────────── */
function ProtocolCard({ proto, idx }) {
  const [expanded, setExpanded] = useState(false)
  const [steps, setSteps]       = useState(proto.steps)
  const [activating, setActivating] = useState(false)
  const sc  = STATUS_LABEL[proto.status] ?? STATUS_LABEL.standby
  const Icon = ProtocolIcons[proto.icon] ?? ProtocolIcons.fire
  const done = steps.filter(s => s.done).length

  const toggleStep = (id) => setSteps(s => s.map(step => step.id === id ? { ...step, done: !step.done } : step))

  const activate = (e) => {
    e.stopPropagation()
    setActivating(true)
    setTimeout(() => setActivating(false), 2000)
  }

  return (
    <div style={{
      border: `1px solid ${proto.color}30`,
      borderLeft: `4px solid ${proto.color}`,
      borderRadius: 14,
      background: proto.status === 'active' ? `${proto.color}08` : proto.status === 'monitoring' ? 'rgba(183,121,31,0.04)' : 'rgba(255,255,255,0.95)',
      padding: '18px 20px',
      cursor: 'pointer',
      animation: `slideInUp 0.4s ease both`,
      animationDelay: `${idx * 80}ms`,
      transition: 'box-shadow 0.2s',
    }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Head */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Icon />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#1A202C' }}>{proto.name}</span>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: sc.color, background: sc.bg, padding: '2px 9px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {sc.label}
            </span>
            {proto.status === 'monitoring' && (
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B7791F', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            )}
          </div>
          {/* Barra de progreso de pasos */}
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${(done / steps.length) * 100}%`, background: proto.color, borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: 10, color: '#718096', fontWeight: 600, whiteSpace: 'nowrap' }}>{done}/{steps.length} pasos</span>
          </div>
        </div>
        <span style={{ color: '#A0AEC0', flexShrink: 0, display: 'flex' }}>
          {expanded ? <IconChevronUp size={16}/> : <IconChevronDown size={16}/>}
        </span>
      </div>

      {/* Expandido */}
      {expanded && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {/* Pasos */}
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#4A5568', marginBottom: 10 }}>Pasos del Protocolo</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {steps.map(step => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
                onClick={e => { e.stopPropagation(); toggleStep(step.id) }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6,
                  border: `2px solid ${step.done ? proto.color : 'rgba(0,0,0,0.20)'}`,
                  background: step.done ? proto.color : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1, transition: 'all 0.2s',
                }}>
                  {step.done && <span style={{ color: '#fff', display: 'flex' }}><IconCheck size={12}/></span>}
                </div>
                <span style={{ fontSize: 12.5, color: step.done ? '#718096' : '#1A202C', textDecoration: step.done ? 'line-through' : 'none', lineHeight: 1.5 }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Contactos */}
          <div style={{ background: 'rgba(2,115,94,0.05)', border: '1px solid rgba(2,115,94,0.12)', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#02735E', marginBottom: 6 }}>Contactos de emergencia</p>
            {proto.contacts.map((c, i) => (
              <div key={i} style={{ fontSize: 12, color: '#2D3748', lineHeight: 1.7, fontWeight: 500 }}>{c}</div>
            ))}
          </div>

          {/* Acción principal */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none',
              background: proto.status === 'active' ? '#718096' : proto.color,
              color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer',
              transition: 'all 0.2s',
              opacity: activating ? 0.7 : 1,
            }}
              onClick={activate}
            >
              {activating ? '⏳ Activando...' : proto.status === 'active' ? 'Desactivar protocolo' : 'Activar protocolo'}
            </button>
            <button style={{ padding: '10px 16px', borderRadius: 10, border: `1.5px solid ${proto.color}`, background: 'transparent', color: proto.color, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Escalar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Decision Card (War Room) ──────────────────────────────────────── */
function DecisionCard({ dec, idx }) {
  const [chosen, setChosen] = useState(null)
  const pCfg = {
    critical: { color: '#C53030', bg: 'rgba(197,48,48,0.05)', border: 'rgba(197,48,48,0.25)' },
    high:     { color: '#C05621', bg: 'rgba(192,86,33,0.04)', border: 'rgba(192,86,33,0.20)' },
    medium:   { color: '#B7791F', bg: 'rgba(183,121,31,0.04)', border: 'rgba(183,121,31,0.18)' },
  }
  const cfg = pCfg[dec.priority] ?? pCfg.medium

  return (
    <div style={{
      background: cfg.bg, border: `1px solid ${cfg.border}`, borderLeft: `4px solid ${cfg.color}`,
      borderRadius: 14, padding: '16px 18px',
      animation: `slideInRight 0.4s ease both`, animationDelay: `${idx * 70}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, animation: 'pulse 2s infinite', flexShrink: 0 }} />
        <span style={{ fontSize: 9.5, fontWeight: 800, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {dec.priority}
        </span>
        <span style={{ fontSize: 10, color: '#A0AEC0', marginLeft: 'auto' }}>{dec.time}</span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 800, color: '#1A202C', marginBottom: 6, lineHeight: 1.3 }}>{dec.title}</p>
      <p style={{ fontSize: 11.5, color: '#4A5568', lineHeight: 1.6, marginBottom: 12 }}>{dec.context}</p>

      {/* Recomendación MAYIA */}
      {dec.mayiaReason && (
        <div style={{ background: 'rgba(2,115,94,0.07)', border: '1px solid rgba(2,115,94,0.15)', borderRadius: 8, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ color: '#02735E', display: 'flex', marginTop: 2, flexShrink: 0 }}><IconCircleDot size={12}/></span>
          <span style={{ fontSize: 11, color: '#02735E', lineHeight: 1.5, fontWeight: 500 }}>MAYIA: {dec.mayiaReason}</span>
        </div>
      )}

      {/* Opciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {dec.options.map(opt => (
          <button key={opt.id} onClick={() => setChosen(opt.id)} style={{
            padding: '10px 16px', borderRadius: 10,
            border: `1.5px solid ${opt.color}`,
            background: chosen === opt.id ? opt.color : `${opt.color}10`,
            color: chosen === opt.id ? '#fff' : opt.color,
            fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.15s', textAlign: 'left',
            opacity: chosen && chosen !== opt.id ? 0.4 : 1,
          }}>
            {dec.mayiaRec === opt.id && '★ '}{opt.label}
          </button>
        ))}
      </div>
      {chosen && (
        <div style={{ marginTop: 10, fontSize: 11, color: '#02735E', fontWeight: 700, padding: '6px 10px', background: 'rgba(2,115,94,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconCheck size={14}/> Decisión registrada: {dec.options.find(o => o.id === chosen)?.label}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Protocolos() {
  const [tab, setTab] = useState('protocols')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Encabezado */}
      <div>
        <p style={spt.kicker}>Gestión de Crisis</p>
        <h2 style={spt.title}>Protocolos y Toma de Decisiones</h2>
        <p style={spt.sub}>Centro de coordinación estratégica · H. Cámara de Diputados</p>
      </div>

      <MayiaPanel section="protocolos" title="MAYIA · Coordinación" />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid rgba(0,0,0,0.10)', paddingBottom: 0 }}>
        {[
          { id: 'protocols', label: 'Protocolos de Emergencia' },
          { id: 'war-room',  label: 'Sala de Decisiones' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 18px', borderRadius: '8px 8px 0 0',
            border: '1px solid', borderBottom: 'none',
            background: tab === t.id ? '#fff' : 'transparent',
            borderColor: tab === t.id ? 'rgba(0,0,0,0.10)' : 'transparent',
            color: tab === t.id ? '#08261E' : '#718096',
            fontSize: 13, fontWeight: tab === t.id ? 800 : 600,
            cursor: 'pointer', transition: 'all 0.15s',
            marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6
          }}>
            {t.id === 'war-room' && <IconCircle size={10} fill={tab === t.id ? '#C53030' : 'currentColor'} color={tab === t.id ? '#C53030' : 'currentColor'} />}
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab */}
      {tab === 'protocols' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
          {PROTOCOLS.map((p, i) => <ProtocolCard key={p.id} proto={p} idx={i} />)}
        </div>
      ) : (
        <div>
          <div style={{ background: 'rgba(197,48,48,0.05)', border: '1px solid rgba(197,48,48,0.15)', borderRadius: 12, padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#C53030' }}><IconAlert size={24} /></span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#C53030' }}>Sala de Decisiones Activa</p>
              <p style={{ fontSize: 11.5, color: '#718096', lineHeight: 1.5 }}>
                {DECISIONS.length} situaciones requieren tu decisión inmediata. MAYIA sugiere la acción recomendada para cada caso.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
            {DECISIONS.map((d, i) => <DecisionCard key={d.id} dec={d} idx={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}

const spt = {
  kicker: { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:  { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:    { fontSize: 13, color: '#718096', marginTop: 2 },
}
