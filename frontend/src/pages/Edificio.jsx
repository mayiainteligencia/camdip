import { useState } from 'react'
import { HOSPITALS, INTERNAL_SERVICES } from '@/data/securityData'
import ubicacion from '@/assets/ubicacion.jpeg'
import { MayiaPanel } from '@/components/ui/Mayia'
import { 
  IconHospital, IconFire, IconPhone, IconMap, IconClock, 
  IconCoffee, IconScissors, IconUtensils, IconBook, IconDroplet, IconSearch, IconExtinguisher, IconBuilding, IconAlert
} from '@/components/ui/Icons'

/* ── Tarjeta de hospital ───────────────────────────────────────────── */
function HospitalCard({ h, idx }) {
  return (
    <div className="hud-panel lift" style={{
      padding: '14px 16px',
      animation: `slideInUp 0.4s ease both`,
      animationDelay: `${idx * 70}ms`,
      borderLeft: h.emergency ? '3px solid #C53030' : '3px solid rgba(2,115,94,0.30)',
    }}>
      <span className="hud-corner tl" style={{ borderColor: h.emergency ? '#C53030' : '#02735E' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: h.emergency ? 'rgba(197,48,48,0.10)' : 'rgba(2,115,94,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: h.emergency ? '#C53030' : '#02735E', flexShrink: 0 }}>
          <IconHospital />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#1A202C', lineHeight: 1.3, marginBottom: 6 }}>{h.name}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#4A5568' }}>
              <IconMap />  {h.distance}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#4A5568' }}>
              <IconClock /> {h.time}
            </span>
            {h.emergency && (
              <span style={{ fontSize: 9.5, fontWeight: 800, color: '#C53030', background: 'rgba(197,48,48,0.08)', padding: '2px 8px', borderRadius: 10 }}>Urgencias 24h</span>
            )}
          </div>
          <div style={{ fontSize: 10.5, color: '#718096', marginBottom: 10 }}>{h.address}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={`tel:${h.phone.replace(/\s/g,'')}`} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, color: '#fff',
              background: h.emergency ? '#C53030' : '#08261E',
              padding: '7px 14px', borderRadius: 8,
              textDecoration: 'none', flex: 1, justifyContent: 'center',
            }}>
              <IconPhone /> {h.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tarjeta de servicio interno ───────────────────────────────────── */
const SERVICE_ICONS = { 
  'Cafetería': <IconCoffee size={22}/>, 
  'Servicios Personales': <IconScissors size={22}/>, 
  'Salud': <IconHospital size={22}/>, 
  'Alimentos': <IconUtensils size={22}/>, 
  'Cultural': <IconBook size={22}/> 
}

function ServiceCard({ s, idx }) {
  const isOpen = s.status === 'open'
  return (
    <div className="hud-panel lift" style={{
      padding: '14px 16px',
      animation: `slideInUp 0.4s ease both`,
      animationDelay: `${idx * 60}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{SERVICE_ICONS[s.type] ?? <IconBuilding size={22}/>}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1A202C' }}>{s.name}</span>
            <span style={{
              fontSize: 9.5, fontWeight: 800, padding: '2px 8px', borderRadius: 10,
              color: isOpen ? '#02735E' : '#718096',
              background: isOpen ? 'rgba(2,115,94,0.10)' : 'rgba(0,0,0,0.06)',
            }}>
              {isOpen ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
          <p style={{ fontSize: 11, color: '#718096', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><IconMap size={12}/> {s.floor}</p>
          <p style={{ fontSize: 11, color: '#4A5568', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}><IconClock size={12}/> {s.schedule}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, color: '#718096' }}>Responsable: {s.manager}</span>
            <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#02735E', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              <IconPhone /> {s.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Panel contra incendios ────────────────────────────────────────── */
function FirePanel() {
  const zones = [
    { zone: 'Planta Baja', sprinklers: 'OK', detector: 'OK', extintores: 3, status: 'ok' },
    { zone: 'Planta 1',    sprinklers: 'OK', detector: 'OK', extintores: 4, status: 'ok' },
    { zone: 'Planta 2 — Zona C', sprinklers: 'OK', detector: 'ALERTA', extintores: 2, status: 'alert' },
    { zone: 'Planta 3',    sprinklers: 'OK', detector: 'OK', extintores: 3, status: 'ok' },
    { zone: 'Estacionamiento', sprinklers: 'OK', detector: 'OK', extintores: 2, status: 'ok' },
  ]
  return (
    <div>
      {zones.map((z, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}>
          <span style={{ fontSize: 11.5, flex: 1, fontWeight: 600, color: '#1A202C' }}>{z.zone}</span>
          <span style={{ fontSize: 10.5, color: '#02735E', background: 'rgba(2,115,94,0.08)', padding: '4px 8px', borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><IconDroplet size={14}/> {z.sprinklers}</span>
          <span style={{ fontSize: 10.5, color: z.detector === 'OK' ? '#02735E' : '#C53030', background: z.detector === 'OK' ? 'rgba(2,115,94,0.08)' : 'rgba(197,48,48,0.08)', padding: '4px 8px', borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><IconSearch size={14}/> {z.detector}</span>
          <span style={{ fontSize: 10.5, color: '#4A5568', display: 'flex', alignItems: 'center', gap: 4 }}><IconExtinguisher size={14}/> ×{z.extintores}</span>
          {z.status === 'alert' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C53030', animation: 'pulse 1.5s infinite', flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Edificio() {
  const [emergencyMode, setEmergencyMode] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={se.kicker}>Información Contextual</p>
          <h2 style={se.title}>Edificio y Entorno</h2>
          <p style={se.sub}>Servicios internos, hospitales cercanos y sistemas de emergencia</p>
        </div>
        <button
          onClick={() => setEmergencyMode(e => !e)}
          style={{
            padding: '10px 20px', borderRadius: 10, border: 'none',
            background: emergencyMode ? '#C53030' : '#08261E', color: '#fff',
            fontSize: 13, fontWeight: 800, cursor: 'pointer',
            boxShadow: emergencyMode ? '0 0 20px rgba(197,48,48,0.40)' : 'none',
            animation: emergencyMode ? 'pulse 1.5s ease-in-out infinite' : 'none',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          {emergencyMode ? <><IconAlert size={16}/> EMERGENCIA ACTIVA</> : <><IconHospital size={16}/> Activar Emergencia Médica</>}
        </button>
      </div>

      {emergencyMode && (
        <div style={{ background: 'rgba(197,48,48,0.08)', border: '2px solid #C53030', borderRadius: 14, padding: '16px 20px', animation: 'slideInUp 0.3s ease', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#C53030' }}><IconAlert size={28} /></span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#C53030', marginBottom: 4 }}>Protocolo de Emergencia Médica Activado</p>
            <p style={{ fontSize: 12, color: '#2D3748', lineHeight: 1.5 }}>El equipo de seguridad ha sido notificado. Cruz Roja más cercana: 5 minutos. Médico de guardia: Ext. 1900.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="tel:911" style={{ padding: '10px 20px', borderRadius: 10, background: '#C53030', color: '#fff', fontSize: 13, fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}><IconPhone size={14}/> 911</a>
            <button onClick={() => setEmergencyMode(false)} style={{ padding: '10px 16px', borderRadius: 10, border: '1.5px solid #C53030', background: 'transparent', color: '#C53030', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <MayiaPanel section="edificio" title="MAYIA · Edificio" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>

        {/* Mapa */}
        <div className="hud-panel lift" style={{ padding: 12, gridColumn: 'span 2' }}>
          <span className="hud-corner tl" />
          <span className="hud-corner br" />
          <p style={{ ...se.sHead, marginBottom: 10 }}>Ubicación — H. Cámara de Diputados, San Lázaro</p>
          <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '16/7', position: 'relative' }}>
            <img src={ubicacion} alt="Ubicación Cámara de Diputados" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,38,30,0.20)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 12, background: 'rgba(8,38,30,0.90)', padding: '5px 12px', borderRadius: 8, border: '1px solid rgba(214,217,137,0.25)' }}>
              <span style={{ fontSize: 10, color: '#D6D989', fontWeight: 700, letterSpacing: '0.06em' }}>H. CONGRESO DE LA UNIÓN · AV. CONGRESO DE LA UNIÓN S/N · CDMX 15969</span>
            </div>
          </div>
        </div>

        {/* Hospitales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ ...se.sHead, display: 'flex', alignItems: 'center', gap: 6 }}><IconHospital size={16}/> Hospitales Cercanos</p>
          {HOSPITALS.map((h, i) => <HospitalCard key={h.id} h={h} idx={i} />)}
        </div>

        {/* Servicios internos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ ...se.sHead, display: 'flex', alignItems: 'center', gap: 6 }}><IconBuilding size={16}/> Servicios Internos del Edificio</p>
          {INTERNAL_SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} idx={i} />)}
        </div>

        {/* Sistema contra incendios */}
        <div className="hud-panel lift hud-red" style={{ padding: 16 }}>
          <span className="hud-corner tl" style={{ borderColor: '#C53030' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ color: '#C53030' }}><IconFire /></div>
            <p style={{ ...se.sHead, marginBottom: 0, color: '#C53030' }}>Sistema contra Incendios</p>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 800, color: '#C53030', background: 'rgba(197,48,48,0.10)', padding: '2px 8px', borderRadius: 8 }}>1 ALERTA</span>
          </div>
          <FirePanel />
        </div>

        {/* Directorio de emergencia */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tr" style={{ borderColor: '#D6D989' }} />
          <p style={{...se.sHead, display: 'flex', alignItems: 'center', gap: 6}}><IconPhone size={14}/> Directorio de Emergencias</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Emergencias CDMX',     phone: '911',          color: '#C53030' },
              { name: 'Bomberos CDMX',         phone: '55 5768 3700', color: '#C53030' },
              { name: 'Cruz Roja',             phone: '65 5310 5600', color: '#C53030' },
              { name: 'Policía Federal',        phone: '088',          color: '#2B6CB0' },
              { name: 'Jefe de Seguridad',      phone: '55 1234 5678', color: '#02735E' },
              { name: 'Médico de Guardia',      phone: 'Ext. 1900',    color: '#02735E' },
              { name: 'Protección Civil CDMX', phone: '55 5658 1111', color: '#B7791F' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: 12.5, color: '#1A202C', fontWeight: 600 }}>{c.name}</span>
                <a href={`tel:${c.phone.replace(/\s/g,'')}`} style={{
                  display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace',
                  fontSize: 12, fontWeight: 800, color: c.color, textDecoration: 'none',
                  background: `${c.color}10`, padding: '4px 10px', borderRadius: 8, border: `1px solid ${c.color}25`,
                }}>
                  <IconPhone /> {c.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const se = {
  kicker: { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:  { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:    { fontSize: 13, color: '#718096', marginTop: 2 },
  sHead:  { fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 14 },
}
