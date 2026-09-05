import { useState } from 'react'
import { MayiaPanel } from '@/components/ui/Mayia'

// SVG Line chart animado (Tráfico de red)
const NetworkGraph = () => {
  return (
    <div style={{ height: 60, width: '100%', position: 'relative', marginTop: 10 }}>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2B6CB0', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#2B6CB0', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d="M0,25 L10,20 L20,24 L30,15 L40,18 L50,8 L60,15 L70,5 L80,10 L90,2 L100,8 L100,30 L0,30 Z" fill="url(#grad1)" />
        <polyline points="0,25 10,20 20,24 30,15 40,18 50,8 60,15 70,5 80,10 90,2 100,8" fill="none" stroke="#2B6CB0" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset="200" style={{ animation: 'dashLine 4s linear forwards infinite' }} />
      </svg>
    </div>
  )
}

// Bar chart animado (DDoS)
const DDoSGraph = ({ shieldActive }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', height: 40, gap: 4, marginTop: 12 }}>
    {[40, 25, 60, 40, 80, 50, 90, 70, 45, 100, 60, 30].map((h, i) => {
      const height = shieldActive ? Math.max(5, h * 0.2) : h; // Baja drásticamente si el escudo está activo
      const color = shieldActive ? '#02735E' : (h > 75 ? '#C53030' : '#2B6CB0');
      return (
        <div key={i} style={{ flex: 1, background: color, height: `${height}%`, borderRadius: '2px 2px 0 0', transition: 'height 0.5s ease, background 0.5s ease', animation: shieldActive ? 'none' : `pulse ${1 + (i % 3)}s infinite alternate` }} />
      )
    })}
  </div>
)

export default function Ciberseguridad() {
  const [isIsolating, setIsIsolating] = useState(false)
  const [isolated, setIsolated] = useState(false)
  
  const [shielding, setShielding] = useState(false)
  const [shieldActive, setShieldActive] = useState(false)
  
  const [blockingPhishing, setBlockingPhishing] = useState(false)
  const [phishingBlocked, setPhishingBlocked] = useState(false)

  const [logs, setLogs] = useState([
    { time: '12:04:11', msg: 'Intento de login masivo mitigado - IP: 192.168.4.15 (Bloqueado)' },
    { time: '12:01:45', msg: 'Escaneo de puertos detectado en Red de Invitados (Descartado)' },
    { time: '11:58:20', msg: 'Actualización de firmas de firewall completada.' }
  ])

  const addLog = (msg) => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg }, ...prev])
  }

  const handleIsolate = () => {
    if (isolated) return
    setIsIsolating(true)
    setTimeout(() => {
      setIsIsolating(false)
      setIsolated(true)
      addLog('VLAN de Sesiones (SEAV) aislada exitosamente. Protocolo de emergencia activo.')
    }, 2500)
  }

  const handleReset = () => {
    setIsolated(false)
    addLog('Conexión restaurada en VLAN de Sesiones. Firewall en estado base.')
  }

  const handleShield = () => {
    setShielding(true)
    setTimeout(() => {
      setShielding(false)
      setShieldActive(true)
      addLog('Escudo Anti-DDoS Reforzado Nivel 3. Redirección de tráfico activa.')
    }, 2000)
  }

  const handlePhishing = () => {
    setBlockingPhishing(true)
    setTimeout(() => {
      setBlockingPhishing(false)
      setPhishingBlocked(true)
      addLog('Dominio malicioso (mail-camarainfo.org) bloqueado a nivel DNS.')
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes dashLine { to { stroke-dashoffset: 0; } }
        @keyframes progressFill { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes slideLog { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={ss.kicker}>Protección de Infraestructura</p>
          <h2 style={ss.title}>Ciberseguridad</h2>
          <p style={ss.sub}>Monitoreo de amenazas, firewalls y protección de datos institucionales de San Lázaro</p>
        </div>
      </div>
      
      <MayiaPanel section="ciberseguridad" title="MAYIA · Ciberseguridad Activa" />
      
      {/* GRID PRINCIPAL CON MÚLTIPLES PANELES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        
        {/* PANEL 1: VLAN SEAV */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C' }}>
              Tráfico de Red (VLAN SEAV)
            </p>
            <span style={{ fontSize: 10, background: isolated ? '#FED7D7' : '#C6F6D5', color: isolated ? '#C53030' : '#02735E', padding: '2px 6px', borderRadius: 4, fontWeight: 700, animation: isolated ? 'pulse 1.5s infinite' : 'none' }}>
              {isolated ? 'AISLADO - EMERGENCIA' : 'EN LÍNEA - ESTABLE'}
            </span>
          </div>
          
          <NetworkGraph />
          
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button onClick={handleIsolate} disabled={isIsolating || isolated} style={{ ...ss.btnAlert, opacity: (isIsolating || isolated) ? 0.5 : 1 }}>
              {isIsolating ? 'AISLANDO VLAN...' : isolated ? 'RED AISLADA' : 'AISLAR VLAN SEAV'}
            </button>
            <button onClick={handleReset} disabled={!isolated} style={{ ...ss.btnOutline, opacity: !isolated ? 0.5 : 1 }}>
              RESTAURAR CONEXIÓN
            </button>
          </div>
          {isIsolating && (
            <div style={{ marginTop: 10, height: 4, background: '#E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#C53030', animation: 'progressFill 2.5s ease forwards' }} />
            </div>
          )}
        </div>

        {/* PANEL 2: Escudo Anti-DDoS */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C' }}>
              Escudo Anti-DDoS Perimetral
            </p>
            <span style={{ fontSize: 10, color: shieldActive ? '#02735E' : '#C53030', fontWeight: 800 }}>
              {shieldActive ? 'PROTECCIÓN MÁXIMA' : 'PICO DE TRÁFICO'}
            </span>
          </div>
          
          <DDoSGraph shieldActive={shieldActive} />
          <p style={{ fontSize: 11, color: '#718096', marginTop: 8 }}>Peticiones maliciosas externas hacia el portal público y servicios web.</p>
          
          <div style={{ marginTop: 16 }}>
            <button onClick={handleShield} disabled={shielding || shieldActive} style={{ ...ss.btnAction, width: '100%', background: shieldActive ? '#02735E' : '#2B6CB0', opacity: shielding ? 0.6 : 1 }}>
              {shielding ? 'APLICANDO REGLAS BGP...' : shieldActive ? 'ESCUDO REFORZADO ACTIVO' : 'REFORZAR ESCUDO ANTI-DDOS'}
            </button>
          </div>
        </div>

        {/* PANEL 3: Filtro Anti-Phishing */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 12 }}>
            Filtro Phishing (Buzones Diputados)
          </p>
          <div style={{ background: 'rgba(0,0,0,0.03)', padding: 12, borderRadius: 8, borderLeft: phishingBlocked ? '3px solid #02735E' : '3px solid #D69E2E' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#1A202C' }}>Ataque dirigido detectado</p>
            <p style={{ fontSize: 11, color: '#4A5568', marginTop: 4 }}>Remitente: <span style={{ color: '#C53030' }}>seguridad@mail-camarainfo.org</span></p>
            <p style={{ fontSize: 11, color: '#4A5568' }}>Asunto: "Actualización Urgente de Credenciales"</p>
            <p style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>Alcance: 45 buzones legislativos institucionales.</p>
            
            <button onClick={handlePhishing} disabled={blockingPhishing || phishingBlocked} style={{ ...ss.btnAlertOutline, width: '100%', marginTop: 12, opacity: blockingPhishing ? 0.6 : (phishingBlocked ? 0.4 : 1) }}>
              {blockingPhishing ? 'APLICANDO REGLA DNS...' : phishingBlocked ? 'DOMINIO BLOQUEADO GLOBALMENTE' : 'BLOQUEAR DOMINIO REMITENTE'}
            </button>
          </div>
        </div>

        {/* PANEL 4: Estado Servidores Físicos */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 12 }}>
            Estado de Servidores Críticos
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Servidor 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#2D3748' }}>SRV-SEAV-01 (Votación)</p>
                <p style={{ fontSize: 10, color: '#718096' }}>Carga CPU: 24% | RAM: 16GB</p>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#48BB78', boxShadow: '0 0 6px rgba(72,187,120,0.5)' }} />
            </div>
            {/* Servidor 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#2D3748' }}>SRV-GACETA-WEB</p>
                <p style={{ fontSize: 10, color: '#718096' }}>Carga CPU: 89% | RAM: 64GB</p>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ECC94B', boxShadow: '0 0 6px rgba(236,201,75,0.5)', animation: 'pulse 1s infinite' }} />
            </div>
            {/* Servidor 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#2D3748' }}>NAS-CCTV-BACKUP</p>
                <p style={{ fontSize: 10, color: '#718096' }}>Espacio: 98% (Crítico)</p>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F56565', boxShadow: '0 0 6px rgba(245,101,101,0.5)', animation: 'pulse 0.5s infinite' }} />
            </div>
          </div>
        </div>

        {/* PANEL 5: Consola de Logs Viva (Ocupa 2 columnas si hay espacio) */}
        <div className="hud-panel lift" style={{ padding: 16, background: '#1A202C', color: '#fff', gridColumn: '1 / -1' }}>
          <span className="hud-corner tl" style={{ borderColor: '#4A5568' }} />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A0AEC0', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>Bitácora de Eventos de Seguridad (En Vivo)</span>
            <span style={{ width: 8, height: 8, background: '#48BB78', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: 100, overflowY: 'auto', paddingRight: 4 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 11, fontFamily: 'monospace', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 6, animation: 'slideLog 0.3s ease' }}>
                <span style={{ color: '#F6E05E', marginRight: 8 }}>[{log.time}]</span>
                <span style={{ color: '#E2E8F0' }}>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

const ss = {
  kicker: { fontSize: 10, fontWeight: 700, color: '#2B6CB0', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:  { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:    { fontSize: 13, color: '#718096', marginTop: 2 },
  btnAlert: { padding: '10px 14px', borderRadius: 8, border: 'none', background: '#C53030', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s', flex: 1 },
  btnOutline: { padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E0', background: 'transparent', color: '#4A5568', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  btnAction: { padding: '10px 14px', borderRadius: 8, border: 'none', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  btnAlertOutline: { padding: '8px 14px', borderRadius: 6, border: '1px solid #C53030', background: 'transparent', color: '#C53030', fontSize: 10, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
}
