/**
 * CAPA DE DATOS DE SEGURIDAD — Centro de Comando, Cámara de Diputados.
 * Todos los datos son MOCKUP para demostración.
 * Cuando se integre el backend, solo cambiar las funciones aquí.
 */

/* ── Cámaras CCTV ──────────────────────────────────────────────────── */
export const CAMERAS = [
  { id: 'cam-01', name: 'Acceso Principal',   zone: 'Entrada Norte',   status: 'online',  recording: true,  feed: null, type: 'ptz',     ai: ['acceso no autorizado', 'paquete sospechoso'] },
  { id: 'cam-02', name: 'Lobby Interno',       zone: 'Planta Baja',     status: 'online',  recording: true,  feed: null, type: 'domo',    ai: ['aglomeración', 'objeto abandonado'] },
  { id: 'cam-03', name: 'Pasillo Legislativo', zone: 'Planta 1',        status: 'online',  recording: true,  feed: null, type: 'fisheye', ai: ['intrusión', 'comportamiento atípico'] },
  { id: 'cam-04', name: 'Acceso Norte',        zone: 'Exterior Norte',  status: 'online',  recording: true,  feed: null, type: 'domo',    ai: ['intrusión', 'vandalismo'] },
  { id: 'cam-05', name: 'Zona de Carga',       zone: 'Acceso B',        status: 'online',  recording: true,  feed: null, type: 'ptz',     ai: ['vehículo no autorizado', 'extracción irregular'] },
  { id: 'cam-06', name: 'Estacionamiento Sur', zone: 'Exterior Sur',    status: 'online',  recording: true,  feed: null, type: 'termica', ai: ['anomalía térmica', 'humo/incendio'] },
  { id: 'cam-07', name: 'Salón de Sesiones',   zone: 'Planta 2',        status: 'online',  recording: true,  feed: null, type: 'domo',    ai: ['alteración/violencia', 'caída o emergencia médica'] },
  { id: 'cam-08', name: 'Área de Proveedores', zone: 'Acceso C',        status: 'online',  recording: true,  feed: null, type: 'ptz',     ai: ['armas — postura de ocultamiento', 'cámara manipulada'] },
]

/* ── Detección de armas por postura (cámaras PTZ/térmicas con IA) ───── */
export const WEAPON_DETECTION_CAMERAS = ['cam-01', 'cam-08']

/* ── Capacidades de detección IA (portafolio AIOT) ─────────────────── */
export const AI_DETECTION_CAPABILITIES = [
  { id: 'weapon',     label: 'Arma oculta / postura de ocultamiento', detail: 'Detecta a una persona agachándose o adoptando posturas típicas de ocultar un arma antes de un incidente.' },
  { id: 'package',    label: 'Paquete sospechoso',                    detail: 'Objetos abandonados o dejados sin supervisión por tiempo prolongado.' },
  { id: 'tamper',     label: 'Cámara manipulada / tampering',         detail: 'Bloqueo, desenfoque o reorientación física de una cámara.' },
  { id: 'intrusion',  label: 'Intrusión y vandalismo',                detail: 'Acceso a zonas restringidas o daño a infraestructura.' },
  { id: 'blindspot',  label: 'Punto ciego generado',                  detail: 'Obstrucción que crea un área sin cobertura de video.' },
  { id: 'fire',       label: 'Humo / incendio y anomalías térmicas',  detail: 'Lectura de cámaras térmicas para focos de calor y humo temprano.' },
  { id: 'crowd',      label: 'Aglomeración',                          detail: 'Concentración de personas por encima del umbral en una zona.' },
  { id: 'violence',   label: 'Alteración / violencia',                detail: 'Movimientos bruscos o forcejeo compatibles con agresión.' },
  { id: 'medical',    label: 'Caída o emergencia médica',             detail: 'Persona en el suelo sin movimiento por tiempo anómalo.' },
  { id: 'access',     label: 'Acceso no autorizado',                  detail: 'Ingreso sin credencial válida o tailgating en torniquetes.' },
  { id: 'ops',        label: 'Anomalías operativas',                  detail: 'Desviaciones de patrones normales de operación en el sitio.' },
  { id: 'insider',    label: 'Amenazas internas',                     detail: 'Exportación irregular de video, cambios de permisos, comportamiento atípico de operador.' },
]

/* ── Drones ───────────────────────────────────────────────────────── */
export const DRONES = [
  {
    id: 'drone-01', name: 'Dron Interior 1', model: 'Indoor Patrol IA',
    zone: 'Salón de Sesiones — Planta 2', status: 'docked', battery: 96,
    capabilities: ['Cámara térmica', 'Detección de aglomeración', 'Vuelo autónomo indoor'],
  },
  {
    id: 'drone-02', name: 'Dron Perimetral 1', model: 'Exterior Guard',
    zone: 'Perímetro Av. Congreso', status: 'docked', battery: 88,
    capabilities: ['Zoom óptico 30x', 'Seguimiento de intrusos', 'Térmica nocturna'],
  },
]

/* ── Robots ───────────────────────────────────────────────────────── */
export const ROBOTS = [
  {
    id: 'robot-01', name: 'Robot de Patrullaje 1', model: 'Sentry Ground Unit',
    zone: 'Lobby y pasillos — Planta Baja', status: 'patrolling', battery: 74,
    capabilities: ['Ronda autónoma programada', 'Detección de personas y objetos', 'Comunicación bidireccional'],
  },
  {
    id: 'robot-02', name: 'Robot de Patrullaje 2', model: 'Sentry Ground Unit',
    zone: 'Estacionamiento Sur', status: 'charging', battery: 31,
    capabilities: ['Lectura de placas', 'Alarma sonora integrada', 'Cámara 360°'],
  },
]

/* ── Alertas activas ───────────────────────────────────────────────── */
export const ALERTS = [
  {
    id: 'alr-001', type: 'fire',         severity: 'critical',
    title: 'Sensor de humo activado',
    detail: 'Detector 2-C-07 activado en Planta 2, Zona C. Temperatura ambiente elevada.',
    zone: 'Planta 2 — Zona C', camera: 'cam-07', time: '10:28',
    status: 'active', protocol: 'fire',
  },
  {
    id: 'alr-009', type: 'weapon',       severity: 'critical',
    title: 'Postura de ocultamiento de arma detectada',
    detail: 'IA detectó a un individuo agachándose y ocultando un objeto bajo la ropa en Área de Proveedores. Requiere verificación inmediata.',
    zone: 'Acceso C — Área de Proveedores', camera: 'cam-08', time: '10:31',
    status: 'active', protocol: 'intruder',
  },
  {
    id: 'alr-002', type: 'suspect',      severity: 'high',
    title: 'Persona sospechosa detectada',
    detail: 'Individual merodeando en perímetro exterior, zona noreste. No porta gafete visible.',
    zone: 'Perímetro Noreste', camera: 'cam-04', time: '10:17',
    status: 'active', protocol: 'intruder',
  },
  {
    id: 'alr-003', type: 'vehicle',      severity: 'high',
    title: 'Vehículo no autorizado en Acceso B',
    detail: 'Camión de carga con placa TXR-45-K no registrado en base de proveedores.',
    zone: 'Acceso B — Zona Carga', camera: 'cam-05', time: '10:12',
    status: 'active', protocol: 'vehicle',
  },
  {
    id: 'alr-004', type: 'protest',      severity: 'medium',
    title: 'Manifestación en Av. Congreso',
    detail: 'Aproximadamente 400 personas avanzando sobre Av. Congreso de la Unión. Distancia actual: 180m.',
    zone: 'Av. Congreso de la Unión', camera: null, time: '10:05',
    status: 'monitoring', protocol: 'protest',
  },
  {
    id: 'alr-005', type: 'camera',       severity: 'low',
    title: 'Cámara 4 — señal restablecida',
    detail: 'Acceso Norte recuperó transmisión estable tras una falla técnica breve.',
    zone: 'Acceso Norte', camera: 'cam-04', time: '10:01',
    status: 'resolved', protocol: null,
  },
  {
    id: 'alr-006', type: 'extraction',   severity: 'medium',
    title: 'Extracción no autorizada',
    detail: 'Cámara detectó salida de cajas sin registro de salida en Acceso Sur.',
    zone: 'Acceso Sur', camera: 'cam-06', time: '09:44',
    status: 'active', protocol: 'extraction',
  },
  {
    id: 'alr-007', type: 'medical',      severity: 'low',
    title: 'Botiquín — revisión vencida',
    detail: 'Revisión mensual del botiquín de emergencia venció hace 3 días.',
    zone: 'Recepción Principal', camera: null, time: '09:00',
    status: 'pending', protocol: 'medical',
  },
  {
    id: 'alr-008', type: 'forgotten',    severity: 'low',
    title: 'Objeto olvidado — Lobby B',
    detail: 'Maleta color negro encontrada sin dueño en el lobby B. Lleva 25 minutos sin reclamar.',
    zone: 'Lobby B', camera: 'cam-02', time: '09:52',
    status: 'pending', protocol: null,
  },
]

/* ── Proveedores autorizados ───────────────────────────────────────── */
export const PROVIDERS = [
  {
    id: 'prov-01', name: 'Carlos Mendoza Ríos',   company: 'Starbucks México',
    type: 'Alimentos', plate: 'MX-KL-234',
    schedule: '07:00 — 09:00', checkedIn: '08:14', checkedOut: null,
    status: 'inside', authorized: true,
    items: 'Café, pasteles, insumos cafetería',
  },
  {
    id: 'prov-02', name: 'Rosa Pérez Gutierrez',  company: 'Salón de Belleza Premium',
    type: 'Servicios', plate: 'CD-78-901',
    schedule: '09:00 — 11:00', checkedIn: '09:03', checkedOut: null,
    status: 'inside', authorized: true,
    items: 'Equipo de estilismo, insumos',
  },
  {
    id: 'prov-03', name: 'Jorge Ramírez Ochoa',   company: 'Limpieza Parlamentaria S.A.',
    type: 'Limpieza', plate: 'BJ-12-567',
    schedule: '06:00 — 08:00', checkedIn: '06:10', checkedOut: '08:35',
    status: 'exited', authorized: true,
    items: 'Equipos de limpieza, químicos autorizados',
  },
  {
    id: 'prov-04', name: 'Arturo Sánchez Vega',   company: 'Mantenimiento Eléctrico CDN',
    type: 'Mantenimiento', plate: 'NZ-90-345',
    schedule: '10:00 — 14:00', checkedIn: null, checkedOut: null,
    status: 'expected', authorized: true,
    items: 'Herramientas eléctricas, refacciones',
  },
  {
    id: 'prov-05', name: 'Desconocido',            company: '—',
    type: 'No registrado', plate: 'TXR-45-K',
    schedule: '—', checkedIn: '10:12', checkedOut: null,
    status: 'alert', authorized: false,
    items: 'Sin declarar',
  },
  {
    id: 'prov-06', name: 'Patricia Lozano Fuentes', company: 'Café México S.A.',
    type: 'Alimentos', plate: 'HM-45-678',
    schedule: '08:00 — 10:00', checkedIn: null, checkedOut: null,
    status: 'delayed', authorized: true,
    items: 'Café, reabastecimiento Starbucks',
  },
]

/* ── Protocolos de emergencia ──────────────────────────────────────── */
export const PROTOCOLS = [
  {
    id: 'fire',      name: 'Incendio',          icon: 'fire',
    status: 'standby', severity: 'critical',
    color: '#C53030',
    steps: [
      { id: 1, label: 'Activar alarma sonora en zona afectada',          done: false },
      { id: 2, label: 'Notificar al cuerpo de bomberos (911)',            done: false },
      { id: 3, label: 'Activar sistema de aspersores zona afectada',      done: false },
      { id: 4, label: 'Iniciar evacuación por rutas señalizadas',         done: false },
      { id: 5, label: 'Coordinar con brigada de primeros auxilios',       done: false },
      { id: 6, label: 'Establecer punto de reunión en explanada sur',     done: false },
    ],
    contacts: ['Bomberos CDMX: 911', 'Jefe de Brigada: Ext. 4210', 'Dirección: Ext. 2000'],
  },
  {
    id: 'protest',   name: 'Manifestación',     icon: 'protest',
    status: 'monitoring', severity: 'high',
    color: '#C05621',
    steps: [
      { id: 1, label: 'Monitorear avance y tamaño de la manifestación',  done: true  },
      { id: 2, label: 'Reforzar seguridad en accesos principales',        done: true  },
      { id: 3, label: 'Coordinar con Policía Federal (contacto asignado)',done: false },
      { id: 4, label: 'Habilitar rutas alternativas para diputados',      done: false },
      { id: 5, label: 'Establecer comunicación con organizadores',        done: false },
      { id: 6, label: 'Reportar a la Presidencia de la Cámara',           done: false },
    ],
    contacts: ['Policía Federal: Ext. 3100', 'Coordinación: Ext. 2150', 'Jefe de Seguridad: 55 1234 5678'],
  },
  {
    id: 'medical',   name: 'Emergencia Médica', icon: 'medical',
    status: 'standby', severity: 'high',
    color: '#2B6CB0',
    steps: [
      { id: 1, label: 'Evaluar condición del paciente',                   done: false },
      { id: 2, label: 'Llamar ambulancia (911)',                          done: false },
      { id: 3, label: 'Activar brigada de primeros auxilios interna',     done: false },
      { id: 4, label: 'Despejar área para acceso de paramédicos',         done: false },
      { id: 5, label: 'Acompañar a hospital más cercano si es necesario', done: false },
    ],
    contacts: ['Emergencias: 911', 'Médico de Guardia: Ext. 1900', 'Hospital Juárez: 55 5729 9900'],
  },
  {
    id: 'intruder',  name: 'Intruso / Sospechoso', icon: 'intruder',
    status: 'standby', severity: 'high',
    color: '#702459',
    steps: [
      { id: 1, label: 'Identificar y seguir por cámaras al individuo',   done: false },
      { id: 2, label: 'Enviar equipo de seguridad a interceptar',         done: false },
      { id: 3, label: 'Asegurar accesos del área afectada',               done: false },
      { id: 4, label: 'Verificar identidad y credenciales',               done: false },
      { id: 5, label: 'Reportar a autoridades si aplica',                 done: false },
    ],
    contacts: ['Jefe de Seguridad: 55 1234 5678', 'PGJ: 911', 'Control: Ext. 3000'],
  },
  {
    id: 'evacuation', name: 'Evacuación General', icon: 'evacuation',
    status: 'standby', severity: 'critical',
    color: '#C53030',
    steps: [
      { id: 1, label: 'Activar alarma de evacuación general',             done: false },
      { id: 2, label: 'Notificar a todos los coordinadores de piso',      done: false },
      { id: 3, label: 'Dirigir personal por rutas de evacuación A, B, C', done: false },
      { id: 4, label: 'Verificar que no quede personal en edificio',      done: false },
      { id: 5, label: 'Pasar lista en punto de reunión (Explanada Sur)',   done: false },
      { id: 6, label: 'Reportar situación a autoridades competentes',     done: false },
    ],
    contacts: ['Bomberos: 911', 'Protección Civil: 55 5658 1111', 'Presidencia: Ext. 2000'],
  },
]

/* ── Decisiones pendientes ─────────────────────────────────────────── */
export const DECISIONS = [
  {
    id: 'dec-001', priority: 'critical', time: '10:28',
    title: 'Sensor de humo — Planta 2, Zona C',
    context: 'Detector 2-C-07 activo. No se ha confirmado si es falsa alarma. 3 min sin respuesta del personal de piso.',
    options: [
      { id: 'a', label: 'Activar Protocolo Incendio', color: '#C53030', icon: 'fire' },
      { id: 'b', label: 'Enviar equipo a verificar',  color: '#C05621', icon: 'team' },
      { id: 'c', label: 'Desestimar (falsa alarma)',   color: '#718096', icon: 'dismiss' },
    ],
    mayiaRec: 'a',
    mayiaReason: 'En promedio, 1 de cada 4 activaciones de este sensor resultó en incendio real. Mejor activar y desactivar que lamentar.',
  },
  {
    id: 'dec-002', priority: 'high', time: '10:17',
    title: 'Manifestación a 180m del acceso principal',
    context: '~400 manifestantes avanzando por Av. Congreso. Policía Federal notificada pero sin unidades en sitio aún.',
    options: [
      { id: 'a', label: 'Activar Protocolo Manifestación', color: '#C05621', icon: 'protest' },
      { id: 'b', label: 'Reforzar accesos y monitorear',   color: '#2B6CB0', icon: 'watch'  },
      { id: 'c', label: 'Escalar a Presidencia de Cámara', color: '#02735E', icon: 'escalate' },
    ],
    mayiaRec: 'a',
    mayiaReason: 'El protocolo de manifestación debe activarse cuando el grupo supera las 200 personas y está a menos de 300m. Ambos umbrales están superados.',
  },
  {
    id: 'dec-003', priority: 'high', time: '10:12',
    title: 'Camión placa TXR-45-K — Acceso B',
    context: 'Vehículo de carga no registrado. El conductor dice ser proveedor de agua, pero no hay orden de servicio.',
    options: [
      { id: 'a', label: 'Detener y verificar documentos', color: '#C05621', icon: 'stop'   },
      { id: 'b', label: 'Denegar acceso y desalojar',     color: '#C53030', icon: 'deny'   },
      { id: 'c', label: 'Permitir acceso supervisado',    color: '#718096', icon: 'allow'  },
    ],
    mayiaRec: 'a',
    mayiaReason: 'No hay antecedentes de este vehículo. Detener y verificar es la acción de menor riesgo mientras se corrobora identidad.',
  },
  {
    id: 'dec-004', priority: 'medium', time: '09:52',
    title: 'Maleta sin dueño — Lobby B',
    context: 'Maleta negra de tela, tamaño mediano, 25 min sin reclamar. Personal de limpieza la encontró cerca de la salida B.',
    options: [
      { id: 'a', label: 'Activar protocolo de objeto olvidado', color: '#C05621', icon: 'bag'     },
      { id: 'b', label: 'Aislar área y llamar a Artificieros',  color: '#C53030', icon: 'danger'  },
      { id: 'c', label: 'Esperar 15 min más',                   color: '#718096', icon: 'wait'   },
    ],
    mayiaRec: 'a',
    mayiaReason: 'Primero aislar y llamar a Seguridad para inspección visual sin tocar. El protocolo estándar es seguro y evita falsas alarmas costosas.',
  },
]

/* ── KPIs del Dashboard ────────────────────────────────────────────── */
export async function getDashboardKPIs() {
  return [
    { id: 'cameras',   label: 'Cámaras Activas',   value: '8/8',  sub: 'Todas operativas',    color: 'green',  trend: 'up'   },
    { id: 'alerts',    label: 'Alertas del Día',    value: '8',    sub: '3 críticas/altas',    color: 'red',    trend: 'up'   },
    { id: 'providers', label: 'Proveedores en Sitio', value: '2',  sub: '1 no autorizado',     color: 'orange', trend: 'up'   },
    { id: 'security',  label: 'Nivel de Seguridad', value: '72%',  sub: 'Medio-Alto',          color: 'green',  trend: 'down' },
  ]
}

/* ── Actividad reciente ────────────────────────────────────────────── */
export async function getRecentActivity() {
  return [
    { id: 1, action: 'Sensor humo 2-C-07 activado',     zone: 'Planta 2 — Zona C', time: '10:28', type: 'fire'      },
    { id: 2, action: 'Cámara 4 recuperó señal parcial', zone: 'Acceso Norte',       time: '10:25', type: 'camera'    },
    { id: 3, action: 'Proveedor Starbucks ingresó',     zone: 'Acceso A',           time: '08:14', type: 'provider'  },
    { id: 4, action: 'Maleta sin dueño reportada',      zone: 'Lobby B',            time: '09:52', type: 'forgotten' },
    { id: 5, action: 'Manifestación confirmada',        zone: 'Av. Congreso 180m',  time: '10:05', type: 'protest'   },
    { id: 6, action: 'Limpieza completó turno y salió', zone: 'Acceso Sur',         time: '08:35', type: 'provider'  },
    { id: 7, action: 'Acceso supervisado — Mant. CDN',  zone: 'Acceso A',           time: '07:55', type: 'provider'  },
  ]
}

/* ── Hospitales cercanos ───────────────────────────────────────────── */
export const HOSPITALS = [
  { id: 'h1', name: 'Hospital Juárez de México',         distance: '2.1 km', time: '7 min',  phone: '55 5729 9900', address: 'Av. Politécnico Nacional 132', emergency: true  },
  { id: 'h2', name: 'Hospital General de México',        distance: '3.8 km', time: '14 min', phone: '55 2789 2000', address: 'Dr. Balmis 148, Doctores',       emergency: true  },
  { id: 'h3', name: 'Cruz Roja Mexicana — Venustiano C.', distance: '1.6 km', time: '5 min',  phone: '65 5310 5600', address: 'Congreso de la Unión 64',        emergency: true  },
  { id: 'h4', name: 'Clínica ISSSTE San Lázaro',         distance: '0.8 km', time: '3 min',  phone: '55 5552 3800', address: 'Av. Eduardo Molina 22',          emergency: false },
]

/* ── Servicios internos del edificio ───────────────────────────────── */
export const INTERNAL_SERVICES = [
  {
    id: 'starbucks', name: 'Starbucks',           type: 'Cafetería',
    floor: 'Planta Baja — Ala Norte',
    schedule: 'Lun–Vie 07:00–20:00', status: 'open',
    phone: 'Ext. 4050', manager: 'Laura Gómez',
  },
  {
    id: 'salon', name: 'Salón de Belleza',         type: 'Servicios Personales',
    floor: 'Planta Baja — Ala Sur',
    schedule: 'Lun–Vie 09:00–18:00', status: 'open',
    phone: 'Ext. 4120', manager: 'Ana Ríos',
  },
  {
    id: 'medico', name: 'Servicio Médico',          type: 'Salud',
    floor: 'Planta 1 — Edificio A',
    schedule: 'Lun–Vie 08:00–20:00 · 24h emergencias', status: 'open',
    phone: 'Ext. 1900', manager: 'Dr. Marco Vargas',
  },
  {
    id: 'cafeteria', name: 'Cafetería Legislativa', type: 'Alimentos',
    floor: 'Planta 1 — Edificio B',
    schedule: 'Lun–Vie 07:30–18:00', status: 'open',
    phone: 'Ext. 4200', manager: 'Roberto Castillo',
  },
  {
    id: 'biblioteca', name: 'Biblioteca',           type: 'Cultural',
    floor: 'Planta 2 — Ala Oriente',
    schedule: 'Lun–Vie 09:00–17:00', status: 'closed',
    phone: 'Ext. 3300', manager: 'Patricia León',
  },
]

/* ── Zonas del edificio para el mapa ───────────────────────────────── */
export const BUILDING_ZONES = [
  { id: 'z1', name: 'Acceso Principal',    x: 50,  y: 15,  alerts: 0, type: 'access'   },
  { id: 'z2', name: 'Lobby Norte',         x: 48,  y: 28,  alerts: 0, type: 'lobby'    },
  { id: 'z3', name: 'Acceso B — Carga',    x: 75,  y: 50,  alerts: 1, type: 'cargo'    },
  { id: 'z4', name: 'Acceso Norte',        x: 30,  y: 20,  alerts: 2, type: 'access'   },
  { id: 'z5', name: 'Planta 2 — Zona C',  x: 55,  y: 45,  alerts: 1, type: 'internal' },
  { id: 'z6', name: 'Acceso Sur',          x: 50,  y: 78,  alerts: 1, type: 'access'   },
  { id: 'z7', name: 'Salón de Sesiones',  x: 62,  y: 38,  alerts: 0, type: 'vip'      },
  { id: 'z8', name: 'Starbucks',          x: 35,  y: 60,  alerts: 0, type: 'service'  },
]

/* ── Placas recientes detectadas ────────────────────────────────────── */
export const PLATE_LOG = [
  { plate: 'MX-KL-234', time: '08:14', type: 'Van',    provider: 'Starbucks México',    status: 'authorized' },
  { plate: 'CD-78-901', time: '09:03', type: 'Sedan',  provider: 'Salón de Belleza',    status: 'authorized' },
  { plate: 'BJ-12-567', time: '06:10', type: 'Camión', provider: 'Limpieza Parl. S.A.', status: 'authorized' },
  { plate: 'TXR-45-K',  time: '10:12', type: 'Camión', provider: 'Desconocido',         status: 'unknown'    },
  { plate: 'NZ-90-345', time: '—',     type: 'Camión', provider: 'Mantenimiento CDN',   status: 'expected'   },
  { plate: 'HM-45-678', time: '—',     type: 'Van',    provider: 'Café México S.A.',    status: 'delayed'    },
]
