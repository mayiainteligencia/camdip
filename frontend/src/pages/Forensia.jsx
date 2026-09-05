import { useState } from 'react'
import { MayiaPanel } from '@/components/ui/Mayia'

// Radar SVG Animado
const RadarGraph = ({ active }) => {
  return (
    <div style={{ height: 160, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', background: '#081a16', borderRadius: 12, overflow: 'hidden', marginTop: 12, border: '1px solid rgba(2,115,94,0.3)' }}>
      <svg width="140" height="140" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(2,115,94,0.4)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(2,115,94,0.4)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(2,115,94,0.4)" strokeWidth="0.5" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(2,115,94,0.4)" strokeWidth="0.5" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(2,115,94,0.4)" strokeWidth="0.5" />
        
        {active && (
          <path d="M50,50 L50,5 A45,45 0 0,1 95,50 Z" fill="rgba(2,115,94,0.5)">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
          </path>
        )}
        
        {/* Señales (Blips) */}
        {active && (
          <>
            <circle cx="65" cy="35" r="2.5" fill="#D6D989">
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="30" cy="70" r="2.5" fill="#D6D989">
              <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}

// Analizador de Audio SVG
const AudioWave = ({ analyzing }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 50, gap: 4, marginTop: 12, justifyContent: 'center', background: '#1A202C', borderRadius: 8, border: '1px solid #2D3748' }}>
      {[20,40,60,80,100,70,90,50,70,100,80,40,30,60,40,20].map((n, i) => (
        <div 
          key={i} 
          style={{ 
            width: 5, 
            background: analyzing ? '#D6D989' : '#4A5568', 
            height: analyzing ? `${n}%` : '4px', 
            borderRadius: 2, 
            transition: 'height 0.2s', 
            animation: analyzing ? `audioWave ${0.3 + (i%4)*0.1}s infinite alternate` : 'none' 
          }} 
        />
      ))}
    </div>
  )
}

export default function Forensia() {
  const [sweeping, setSweeping] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState(null)
  
  const [trackingIp, setTrackingIp] = useState(false)
  const [ipTracked, setIpTracked] = useState(false)

  const [usbDisabled, setUsbDisabled] = useState(false)
  
  const [analyzingAudio, setAnalyzingAudio] = useState(false)
  const [audioMatch, setAudioMatch] = useState(null)

  const handleSweep = () => {
    if (sweeping) return
    setSweeping(true)
    setProgress(0)
    setResults(null)
    
    let p = 0
    const interval = setInterval(() => {
      p += 5
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setSweeping(false)
        setResults('Anomalía RF detectada en Curul 142 (Bancada Sur). Frecuencia detectada: 2.4GHz no registrada. Requiere inspección física inmediata.')
      }
    }, 150)
  }

  const handleTrackIp = () => {
    setTrackingIp(true)
    setTimeout(() => {
      setTrackingIp(false)
      setIpTracked(true)
    }, 2000)
  }

  const handleDisableUsb = () => {
    setUsbDisabled(true)
  }

  const handleAnalyzeAudio = () => {
    setAnalyzingAudio(true)
    setAudioMatch(null)
    setTimeout(() => {
      setAnalyzingAudio(false)
      setAudioMatch('Coincidencia 94% con: Micrófono Ambiental Sala de Comisiones B. Filtración confirmada interna.')
    }, 3000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        @keyframes fadeInAlert { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes audioWave { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={ss.kicker}>Seguridad y Análisis</p>
          <h2 style={ss.title}>Análisis Forense Digital</h2>
          <p style={ss.sub}>Búsqueda de micrófonos, extracción de dispositivos, auditoría documental y biometría</p>
        </div>
      </div>
      
      <MayiaPanel section="forensia" title="MAYIA · Operaciones Forenses Activas" />
      
      {/* GRID PRINCIPAL CON MÚLTIPLES PANELES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        
        {/* PANEL 1: Barrido RF */}
        <div className="hud-panel lift" style={{ padding: 16, gridRow: 'span 2' }}>
          <span className="hud-corner tl" />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C' }}>
            Barrido RF en Salón de Sesiones
          </p>
          <p style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>
            Escaneo espectral buscando dispositivos de audio/video ocultos previo a la votación en el Pleno.
          </p>
          
          <RadarGraph active={sweeping} />
          
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sweeping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#02735E', width: `${progress}%`, transition: 'width 0.2s linear' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#02735E', width: 35 }}>{progress}%</span>
              </div>
            )}
            
            {results && (
              <div style={{ background: '#FED7D7', padding: 12, borderRadius: 8, border: '1px solid #FC8181', animation: 'fadeInAlert 0.4s ease' }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#C53030', marginBottom: 4 }}>🚨 ALERTA DE SEGURIDAD</p>
                <p style={{ fontSize: 12, color: '#742A2A', lineHeight: 1.4 }}>{results}</p>
                <button style={{ ...ss.btnAction, background: '#C53030', marginTop: 8, padding: '6px 10px', fontSize: 10 }}>ENVIAR EQUIPO TÁCTICO AL PLENO</button>
              </div>
            )}

            <button onClick={handleSweep} disabled={sweeping} style={{ ...ss.btnAction, opacity: sweeping ? 0.5 : 1 }}>
              {sweeping ? 'ESCANEANDO FRECUENCIAS...' : 'INICIAR BARRIDO RF'}
            </button>
          </div>
        </div>

        {/* PANEL 2: Auditoria Gaceta */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 12 }}>
            Auditoría Gaceta Parlamentaria
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'rgba(197,48,48,0.05)', padding: 14, borderRadius: 10, border: '1px solid rgba(197,48,48,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#C53030' }}>Borrador_Presupuesto.pdf</span>
                <span style={{ fontSize: 10, background: '#FED7D7', color: '#C53030', padding: '3px 8px', borderRadius: 4, fontWeight: 800 }}>FILTRADO</span>
              </div>
              <p style={{ fontSize: 11, color: '#742A2A', marginBottom: 10 }}>Descarga no autorizada detectada previo a su publicación oficial.</p>
              
              {!ipTracked ? (
                <button onClick={handleTrackIp} disabled={trackingIp} style={{ ...ss.btnAlertOutline, width: '100%', opacity: trackingIp ? 0.6 : 1 }}>
                  {trackingIp ? 'RASTREANDO IP DE ORIGEN...' : 'RASTREAR IP DE DESCARGA'}
                </button>
              ) : (
                <div style={{ background: '#fff', border: '1px dashed #C53030', padding: 8, borderRadius: 6, fontSize: 11, color: '#C53030', fontWeight: 700, animation: 'fadeInAlert 0.3s ease' }}>
                  Origen: ISP Privado (Polanco) - 189.155.XX.XX
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANEL 3: Trazabilidad Audio */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C', marginBottom: 4 }}>
            Trazabilidad de Audio Filtrado
          </p>
          <p style={{ fontSize: 11, color: '#718096', marginBottom: 12 }}>Análisis espectrográfico de nota de voz enviada a medios de prensa.</p>
          
          <AudioWave analyzing={analyzingAudio} />
          
          <div style={{ marginTop: 12 }}>
            {audioMatch && (
              <div style={{ background: 'rgba(2,115,94,0.1)', border: '1px solid #02735E', padding: 10, borderRadius: 6, marginBottom: 10, animation: 'fadeInAlert 0.4s ease' }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#02735E' }}>ORIGEN CONFIRMADO</p>
                <p style={{ fontSize: 11, color: '#2D3748' }}>{audioMatch}</p>
              </div>
            )}
            <button onClick={handleAnalyzeAudio} disabled={analyzingAudio || !!audioMatch} style={{ ...ss.btnOutline, width: '100%', opacity: (analyzingAudio || !!audioMatch) ? 0.5 : 1 }}>
              {analyzingAudio ? 'COMPARANDO HUELLA ACÚSTICA...' : audioMatch ? 'ANÁLISIS COMPLETADO' : 'ANALIZAR HUELLA ACÚSTICA'}
            </button>
          </div>
        </div>

        {/* PANEL 4: Extracción de Dispositivos USB */}
        <div className="hud-panel lift" style={{ padding: 16 }}>
          <span className="hud-corner tl" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A202C' }}>
              Extracción Física (USBs)
            </p>
            <span style={{ fontSize: 10, background: usbDisabled ? '#C6F6D5' : '#FED7D7', color: usbDisabled ? '#02735E' : '#C53030', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
              {usbDisabled ? 'BLOQUEADOS' : '2 CONECTADOS'}
            </span>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.03)', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#4A5568' }}>Dispositivo: Kingston DataTraveler 3.0</p>
            <p style={{ fontSize: 11, color: '#718096' }}>Equipo: PC-Comisiones-04 (Mesa de Trabajo)</p>
            <p style={{ fontSize: 11, color: '#718096' }}>Transferencia detectada: 450 MB (Cifrado)</p>
          </div>

          <button onClick={handleDisableUsb} disabled={usbDisabled} style={{ ...ss.btnAlert, width: '100%', opacity: usbDisabled ? 0.5 : 1 }}>
            {usbDisabled ? 'PUERTOS USB DESHABILITADOS VÍA POLÍTICA' : 'DESHABILITAR PUERTOS USB DE RED'}
          </button>
        </div>

      </div>
    </div>
  )
}

const ss = {
  kicker: { fontSize: 10, fontWeight: 700, color: '#02735E', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 2 },
  title:  { fontSize: 22, fontWeight: 800, color: '#1A202C', letterSpacing: '-0.02em' },
  sub:    { fontSize: 13, color: '#718096', marginTop: 2 },
  btnAction: { padding: '12px 14px', borderRadius: 8, border: 'none', background: '#02735E', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s', width: '100%' },
  btnAlertOutline: { padding: '8px 14px', borderRadius: 6, border: '1px solid #C53030', background: 'transparent', color: '#C53030', fontSize: 10, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  btnAlert: { padding: '10px 14px', borderRadius: 8, border: 'none', background: '#C53030', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
  btnOutline: { padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E0', background: 'transparent', color: '#4A5568', fontSize: 11, fontWeight: 800, cursor: 'pointer', transition: '0.2s' },
}
