import { useState } from 'react'
import { DRONES, ROBOTS } from '@/data/securityData'
import { MayiaPanel } from '@/components/ui/Mayia'
import { IconDrone, IconRobot, IconCircle } from '@/components/ui/Icons'
import vidDroneInterior from '@/assets/Dron Interior 1 — Indoor Patrol IA.mp4'
import vidDronePerimetral from '@/assets/Dron Perimetral 1 — Exterior Guard.mp4'
import vidRobotPatrullaje1 from '@/assets/Patrullaje 1 — Lobby y pasillos — Planta Baja.mp4'
import vidRobotPatrullaje2 from '@/assets/Robot de Patrullaje 2 — Estacionamiento Sur.mp4'

const UNIT_VIDEOS = {
  'drone-01': vidDroneInterior,
  'drone-02': vidDronePerimetral,
  'robot-01': vidRobotPatrullaje1,
  'robot-02': vidRobotPatrullaje2,
}

const STATUS_CFG = {
  docked:     { label: 'En base',     color: '#718096', bg: 'rgba(113,128,150,0.10)' },
  deployed:   { label: 'Desplegado',  color: '#02735E', bg: 'rgba(2,115,94,0.10)' },
  patrolling: { label: 'En ronda',    color: '#02735E', bg: 'rgba(2,115,94,0.10)' },
  charging:   { label: 'Cargando',    color: '#B7791F', bg: 'rgba(183,121,31,0.10)' },
}

/* ── Feed en vivo del dron/robot (mismo lenguaje visual que las cámaras) ── */
function UnitFeed({ unit, Icon, isActive }) {
  const videoSrc = UNIT_VIDEOS[unit.id]
  const hasFeed = isActive || !!videoSrc
  return (
    <div className="cam-feed" style={{ aspectRatio: '16/9' }}>
      {!hasFeed ? (
        <div className="cam-offline-overlay">
          <Icon size={26} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.08em', marginTop: 6 }}>EN BASE · SIN TRANSMISIÓN</span>
        </div>
      ) : (
        <>
          <div className="cam-noise" />
          <div className="cam-scanline" />
          {videoSrc ? (
            <video
              key={unit.id + unit.status}
              src={videoSrc}
              autoPlay
              muted
              playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(135deg, #0a1a14 0%, #1a3028 40%, #0f2019 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center', opacity: 0.2 }}>
                <Icon size={38} />
                <p style={{ fontSize: 9, color: '#02735E', marginTop: 6, letterSpacing: '0.1em', fontWeight: 600 }}>FEED EN VIVO</p>
              </div>
            </div>
          )}
          <div style={{ position: 'absolute', top: 8, left: 10, zIndex: 4, fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(214,217,137,0.8)', letterSpacing: '0.04em' }}>
            {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} CDT
          </div>
          <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 4, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.55)', padding: '2px 7px', borderRadius: 5 }}>
            <div className="cam-rec-dot" />
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 800, letterSpacing: '0.05em' }}>REC</span>
          </div>
        </>
      )}
      <div style={{ position: 'absolute', bottom: 8, left: 8, zIndex: 4 }}>
        <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', fontWeight: 700, background: 'rgba(0,0,0,0.5)', padding: '2px 7px', borderRadius: 5 }}>
          {unit.name}
        </span>
      </div>
    </div>
  )
}

function UnitCard({ unit, Icon, deployLabel, onToggle }) {
  const cfg = STATUS_CFG[unit.status] ?? STATUS_CFG.docked
  const isActive = unit.status === 'deployed' || unit.status === 'patrolling'
  return (
    <div className="hud-panel lift" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <UnitFeed unit={unit} Icon={Icon} isActive={isActive} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: cfg.bg, color: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#1A202C', display: 'block' }}>{unit.name}</span>
          <span style={{ fontSize: 10.5, color: '#718096' }}>{unit.model}</span>
        </div>
        <span style={{ fontSize: 9.5, fontWeight: 800, color: cfg.color, background: cfg.bg, padding: '3px 8px', borderRadius: 10, whiteSpace: 'nowrap' }}>{cfg.label}</span>
      </div>

      <div style={{ fontSize: 10.5, color: '#718096', display: 'flex', alignItems: 'center', gap: 5 }}>
        <IconCircle size={10} /> {unit.zone}
      </div>

      {/* Batería */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#718096', marginBottom: 3 }}>
          <span>Batería</span><span>{unit.battery}%</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${unit.battery}%`, background: unit.battery < 40 ? '#C05621' : '#02735E', transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Capacidades */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {unit.capabilities.map(c => (
          <span key={c} style={{ fontSize: 9.5, color: '#4A5568', background: 'rgba(0,0,0,0.04)', padding: '3px 8px', borderRadius: 8 }}>{c}</span>
        ))}
      </div>

      <button
        onClick={() => onToggle(unit.id)}
        disabled={unit.status === 'charging'}
        style={{
          marginTop: 4, padding: '9px 12px', borderRadius: 8, border: '1px solid',
          fontSize: 12, fontWeight: 700, cursor: unit.status === 'charging' ? 'not-allowed' : 'pointer',
          opacity: unit.status === 'charging' ? 0.5 : 1,
          background: isActive ? 'rgba(197,48,48,0.08)' : '#08261E',
          color: isActive ? '#C53030' : '#fff',
          borderColor: isActive ? 'rgba(197,48,48,0.25)' : '#08261E',
        }}
      >
        {isActive ? 'Regresar a base' : deployLabel}
      </button>
    </div>
  )
}

export default function Robots() {
  const [drones, setDrones] = useState(DRONES)
  const [robots, setRobots] = useState(ROBOTS)

  const toggleDrone = (id) => setDrones(list => list.map(d =>
    d.id === id ? { ...d, status: d.status === 'docked' ? 'deployed' : 'docked' } : d
  ))
  const toggleRobot = (id) => setRobots(list => list.map(r =>
    r.id === id ? { ...r, status: r.status === 'patrolling' ? 'docked' : 'patrolling' } : r
  ))

  const activeDrones = drones.filter(d => d.status === 'deployed').length
  const activeRobots = robots.filter(r => r.status === 'patrolling').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={sr.kicker}>Unidades Autónomas</p>
          <h2 style={sr.title}>Robots y Drones</h2>
          <p style={sr.sub}>Despliegue interior · H. Cámara de Diputados · San Lázaro</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ ...sr.statChip, background: 'rgba(2,115,94,0.08)', borderColor: 'rgba(2,115,94,0.20)', color: '#02735E' }}>
            <span style={{ fontWeight: 900, fontSize: 18 }}>{activeDrones}</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Drones activos</span>
          </div>
          <div style={{ ...sr.statChip, background: 'rgba(2,115,94,0.08)', borderColor: 'rgba(2,115,94,0.20)', color: '#02735E' }}>
            <span style={{ fontWeight: 900, fontSize: 18 }}>{activeRobots}</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Robots en ronda</span>
          </div>
        </div>
      </div>

      <MayiaPanel section="robots" title="MAYIA · Robots y Drones" />

      <div>
        <p style={sr.sectionHead}>Drones — despliegue interior</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {drones.map(d => <UnitCard key={d.id} unit={d} Icon={IconDrone} deployLabel="Desplegar en el recinto" onToggle={toggleDrone} />)}
        </div>
      </div>

      <div>
        <p style={sr.sectionHead}>Robots de patrullaje</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {robots.map(r => <UnitCard key={r.id} unit={r} Icon={IconRobot} deployLabel="Iniciar ronda" onToggle={toggleRobot} />)}
        </div>
      </div>
    </div>
  )
}

const sr = {
  kicker:      { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:       { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:         { fontSize: 13, color: '#718096', marginTop: 2 },
  sectionHead: { fontSize: 12, fontWeight: 800, color: '#1A202C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 },
  statChip:    { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 20px', borderRadius: 12, border: '1px solid' },
}
