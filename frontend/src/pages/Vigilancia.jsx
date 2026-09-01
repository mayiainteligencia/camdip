import { useState } from 'react'
import { CAMERAS, PLATE_LOG } from '@/data/securityData'
import { MayiaPanel } from '@/components/ui/Mayia'
import { IconAlert, IconCheck, IconCircle } from '@/components/ui/Icons'

/* ── Cámara Feed (Mockup) ──────────────────────────────────────────── */
function CamFeed({ cam }) {
  const isOffline = cam.status === 'offline'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Feed */}
      <div className="cam-feed">
        {isOffline ? (
          <div className="cam-offline-overlay">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
              <line x1="2" y1="2" x2="22" y2="22" stroke="rgba(197,48,48,0.5)" />
            </svg>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.08em' }}>SIN SEÑAL</span>
          </div>
        ) : (
          <>
            <div className="cam-noise" />
            <div className="cam-scanline" />
            {/* Contenido de fondo simulado */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: `linear-gradient(135deg, #0a1a14 0%, #1a3028 40%, #0f2019 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center', opacity: 0.2 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#02735E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                </svg>
                <p style={{ fontSize: 9, color: '#02735E', marginTop: 6, letterSpacing: '0.1em', fontWeight: 600 }}>FEED EN VIVO</p>
              </div>
            </div>
            {/* Marca de tiempo simulada */}
            <div style={{ position: 'absolute', top: 8, left: 10, zIndex: 4, fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(214,217,137,0.8)', letterSpacing: '0.04em' }}>
              {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} CDT
            </div>
          </>
        )}

        {/* Etiqueta de cámara */}
        <div style={{
          position: 'absolute', bottom: 8, left: 8, right: 8, zIndex: 4,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', fontWeight: 700, background: 'rgba(0,0,0,0.5)', padding: '2px 7px', borderRadius: 5 }}>
            {cam.name}
          </span>
          {!isOffline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.5)', padding: '2px 7px', borderRadius: 5 }}>
              <div className="cam-rec-dot" />
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 800, letterSpacing: '0.05em' }}>REC</span>
            </div>
          )}
        </div>
      </div>

      {/* Info de cámara */}
      <div style={{ padding: '6px 2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1A202C', display: 'block' }}>{cam.name}</span>
          <span style={{ fontSize: 10, color: '#718096' }}>{cam.zone}</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontWeight: 700,
          color: isOffline ? '#C53030' : '#02735E',
          background: isOffline ? 'rgba(197,48,48,0.08)' : 'rgba(2,115,94,0.08)',
          padding: '3px 8px', borderRadius: 8,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', animation: isOffline ? 'none' : 'pulse 2s infinite' }} />
          {isOffline ? 'OFFLINE' : 'EN VIVO'}
        </div>
      </div>
    </div>
  )
}

/* ── Registro de placa ─────────────────────────────────────────────── */
const STATUS_CFG = {
  authorized: { label: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconCheck size={12}/> Autorizada</span>, color: '#02735E', bg: 'rgba(2,115,94,0.08)'   },
  unknown:    { label: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconAlert size={12}/> Desconocida</span>, color: '#C53030', bg: 'rgba(197,48,48,0.08)' },
  expected:   { label: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconCircle size={12}/> Esperada</span>,    color: '#2B6CB0', bg: 'rgba(43,108,176,0.08)' },
  delayed:    { label: <span style={{display: 'flex', alignItems: 'center', gap: 4}}><IconAlert size={12}/> Retrasada</span>,   color: '#B7791F', bg: 'rgba(183,121,31,0.08)' },
}
function PlateRow({ p }) {
  const cfg = STATUS_CFG[p.status] ?? STATUS_CFG.expected
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 13, color: '#1A202C', background: '#F2F2F2', border: '1px solid rgba(0,0,0,0.10)', borderRadius: 6, padding: '3px 8px', letterSpacing: '0.08em', flexShrink: 0 }}>
        {p.plate}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 11.5, fontWeight: 600, color: '#1A202C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.provider}</span>
        <span style={{ fontSize: 10, color: '#718096' }}>{p.type} · {p.time || 'Pendiente'}</span>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '3px 9px', borderRadius: 10, flexShrink: 0 }}>{cfg.label}</span>
    </div>
  )
}

/* ── Cámara de proveedores destacada ───────────────────────────────── */
function ProviderCamera() {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(2,115,94,0.15)' }}>
      <div className="cam-feed" style={{ aspectRatio: '16/7' }}>
        <div className="cam-noise" />
        <div className="cam-scanline" />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, #0a1a14 0%, #152a20 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10
        }}>
          {/* Simulación de zona de carga */}
          <div style={{ opacity: 0.15, textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#02735E" strokeWidth="0.8">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <p style={{ fontSize: 8.5, color: '#02735E', marginTop: 4, letterSpacing: '0.12em', fontWeight: 600 }}>ZONA DE CARGA — ACCESO B</p>
          </div>
          {/* Alert overlay para vehículo desconocido */}
          <div style={{ background: 'rgba(197,48,48,0.15)', border: '1px solid rgba(197,48,48,0.4)', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C53030', animation: 'pulse 1.2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#C53030', fontWeight: 700, letterSpacing: '0.05em' }}>PLACA NO RECONOCIDA · TXR-45-K</span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 8, left: 10, zIndex: 4, fontFamily: 'monospace', fontSize: 9.5, color: 'rgba(214,217,137,0.8)', letterSpacing: '0.04em' }}>
          {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} CDT
        </div>
        <div style={{ position: 'absolute', bottom: 8, left: 8, zIndex: 4 }}>
          <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', fontWeight: 700, background: 'rgba(0,0,0,0.55)', padding: '2px 8px', borderRadius: 5 }}>
            CAM-05 · Zona de Carga
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 4, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.55)', padding: '2px 7px', borderRadius: 5 }}>
          <div className="cam-rec-dot" />
          <span style={{ fontSize: 9, color: '#fff', fontWeight: 800, letterSpacing: '0.05em' }}>REC</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Vigilancia() {
  const [searchPlate, setSearchPlate] = useState('')
  const [plateResult, setPlateResult] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const found = PLATE_LOG.find(p => p.plate.toLowerCase().replace(/[-\s]/g,'') === searchPlate.toLowerCase().replace(/[-\s]/g,''))
    setPlateResult(found || { plate: searchPlate, status: 'unknown', provider: 'No registrada', type: '—', time: '—' })
  }

  const activeCams = CAMERAS.filter(c => c.status === 'online').length
  const offlineCams = CAMERAS.filter(c => c.status === 'offline').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={sv.kicker}>Vigilancia y CCTV</p>
          <h2 style={sv.title}>Centro de Videovigilancia</h2>
          <p style={sv.sub}>Sistema de cámaras · H. Cámara de Diputados · San Lázaro</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ ...sv.statChip, background: 'rgba(2,115,94,0.08)', borderColor: 'rgba(2,115,94,0.20)', color: '#02735E' }}>
            <span style={{ fontWeight: 900, fontSize: 18 }}>{activeCams}</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>En línea</span>
          </div>
          <div style={{ ...sv.statChip, background: 'rgba(197,48,48,0.08)', borderColor: 'rgba(197,48,48,0.20)', color: '#C53030' }}>
            <span style={{ fontWeight: 900, fontSize: 18 }}>{offlineCams}</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Offline</span>
          </div>
        </div>
      </div>

      <MayiaPanel section="vigilancia" title="MAYIA · Vigilancia" />

      {/* Grid de cámaras */}
      <div>
        <p style={sv.sectionHead}>Grid de Cámaras CCTV</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {CAMERAS.map(cam => <CamFeed key={cam.id} cam={cam} />)}
        </div>
      </div>

      {/* Fila inferior: Cámara proveedores + Placas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>

        {/* Cámara de proveedores */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" style={{ borderColor: '#C53030' }} />
          <p style={sv.sectionHead}>Cámara Proveedores — Alerta Activa</p>
          <ProviderCamera />
          <p style={{ fontSize: 11, color: '#718096', marginTop: 8, lineHeight: 1.5 }}>
            Vehículo no registrado detectado en Acceso B. Se requiere verificación manual.
          </p>
        </div>

        {/* Detector de placas */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tr" style={{ borderColor: '#D6D989' }} />
          <p style={sv.sectionHead}>Verificador de Placas</p>

          {/* Buscador */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input
              value={searchPlate}
              onChange={e => setSearchPlate(e.target.value)}
              placeholder="Ej: MX-KL-234"
              style={sv.plateInput}
            />
            <button type="submit" style={sv.plateBtn}>Verificar</button>
          </form>

          {/* Resultado de búsqueda */}
          {plateResult && (() => {
            const cfg = STATUS_CFG[plateResult.status] ?? STATUS_CFG.expected
            return (
              <div style={{ background: cfg.bg, border: `1px solid ${cfg.color}30`, borderRadius: 10, padding: '10px 14px', marginBottom: 14, animation: 'slideInUp 0.3s ease' }}>
                <div style={{ fontSize: 16, fontWeight: 900, fontFamily: 'monospace', color: '#1A202C', marginBottom: 4 }}>{plateResult.plate}</div>
                <div style={{ fontSize: 12, color: cfg.color, fontWeight: 700 }}>{cfg.label}</div>
                <div style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>{plateResult.provider} · {plateResult.type}</div>
              </div>
            )
          })()}

          {/* Registro completo */}
          <p style={{ ...sv.sectionHead, marginBottom: 8 }}>Registro del Día</p>
          <div>
            {PLATE_LOG.map((p, i) => <PlateRow key={i} p={p} />)}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Estilos ──────────────────────────────────────────────────────── */
const sv = {
  kicker:      { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:       { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:         { fontSize: 13, color: '#718096', marginTop: 2 },
  sectionHead: { fontSize: 12, fontWeight: 800, color: '#1A202C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 },
  statChip:    { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 20px', borderRadius: 12, border: '1px solid' },
  plateInput:  {
    flex: 1, height: 42, padding: '0 14px', borderRadius: 10,
    border: '1.5px solid rgba(2,115,94,0.20)', background: 'rgba(2,115,94,0.03)',
    fontSize: 14, fontFamily: 'monospace', color: '#1A202C', outline: 'none',
    transition: 'all 0.2s',
  },
  plateBtn: {
    height: 42, padding: '0 18px', borderRadius: 10, border: 'none',
    background: '#08261E', color: '#fff', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0,
  },
}
