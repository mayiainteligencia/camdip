// MAYIA — motor de inteligencia de seguridad.
// Genera alertas, predicciones, sugerencias y análisis sobre el estado
// de seguridad del edificio, proveedores, cámaras y protocolos.
// Se consume en toasts emergentes y en el panel MAYIA de cada sección.

// kind → etiqueta y tono de color (sin emojis; el color/etiqueta comunica).
export const KIND = {
  alerta:     { label: 'Alerta',     tone: 'red'   },
  prediccion: { label: 'Predicción', tone: 'blue'  },
  sugerencia: { label: 'Sugerencia', tone: 'green' },
  analisis:   { label: 'Análisis',   tone: 'gray'  },
}

// Genera todos los insights de seguridad, etiquetados por sección.
export function mayiaInsights() {
  const now = new Date()
  const hora = now.getHours()

  const list = [
    {
      id: 'cam-offline', section: 'vigilancia', kind: 'alerta',
      title: 'Cámara 4 — Acceso Norte sin señal',
      detail: 'La cámara del acceso norte lleva 14 minutos sin transmitir. Verificar conexión o posible obstrucción deliberada.',
      plan: { label: 'Enviar técnico a revisar cámara 4', ok: 'Enviar' },
    },
    {
      id: 'placa-desconocida', section: 'seguridad', kind: 'alerta',
      title: 'Camión con placa no reconocida en Acceso B',
      detail: 'Vehículo de carga (placa: TXR-45-K) ingresó al acceso B sin registro previo. No coincide con ningún proveedor autorizado.',
      plan: { label: 'Detener vehículo y verificar identidad', ok: 'Activar protocolo' },
    },
    {
      id: 'manifestacion', section: 'dashboard', kind: 'prediccion',
      title: 'Manifestación detectada en Av. Congreso',
      detail: 'Fuentes externas reportan concentración de aproximadamente 400 personas en Av. Congreso de la Unión, a 180 metros del acceso principal. Tendencia de acercamiento.',
      plan: { label: 'Activar Protocolo Manifestación', ok: 'Activar' },
    },
    {
      id: 'sensor-humo', section: 'alertas', kind: 'alerta',
      title: 'Sensor de humo activado — Planta 2, Zona C',
      detail: 'El detector 2-C-07 registró umbral de humo a las ' + `${hora}:${String(now.getMinutes()).padStart(2,'0')}` + '. Revisar si es falsa alarma o activar protocolo de incendio.',
      plan: { label: 'Activar Protocolo Incendio Zona C', ok: 'Activar' },
    },
    {
      id: 'proveedor-tardio', section: 'seguridad', kind: 'sugerencia',
      title: 'Starbucks: proveedor de reabastecimiento retrasado',
      detail: 'El proveedor de Starbucks (Café México S.A.) tenía ventana de entrega 08:00–10:00. Han pasado 40 minutos del cierre sin registro de ingreso.',
      plan: { label: 'Contactar proveedor', ok: 'Llamar' },
    },
    {
      id: 'patron-acceso', section: 'vigilancia', kind: 'analisis',
      title: 'Patrón inusual de accesos en zona norte',
      detail: `Se detectaron 7 accesos no programados entre las ${hora - 2}:00 y ${hora}:00 en la zona norte. El promedio histórico es de 2 accesos por ese horario.`,
    },
    {
      id: 'emergencia-medica', section: 'edificio', kind: 'sugerencia',
      title: 'Botiquín de emergencia — revisión pendiente',
      detail: 'El protocolo de revisión mensual del botiquín de emergencia venció hace 3 días. Se recomienda revisión inmediata del kit médico en recepción principal.',
      plan: { label: 'Programar revisión de botiquín', ok: 'Programar' },
    },
    {
      id: 'cams-ok', section: 'dashboard', kind: 'analisis',
      title: '7 de 8 cámaras operando normalmente',
      detail: 'El sistema de videovigilancia opera al 87.5% de capacidad. La cámara del acceso norte requiere atención técnica inmediata para restablecer cobertura completa.',
    },
    {
      id: 'ext-no-autorizada', section: 'seguridad', kind: 'alerta',
      title: 'Extracción no autorizada detectada — Acceso Sur',
      detail: 'Cámara de Acceso Sur registró salida de cajas sin registro en sistema. Personal de seguridad debe verificar documentación de salida del proveedor de limpieza.',
      plan: { label: 'Retener y verificar salida', ok: 'Activar' },
    },
  ].filter(Boolean)

  return list
}

// Insights de una sección (o todos si section = 'global').
export function mayiaFor(section) {
  return mayiaInsights().filter(i => i.section === section || section === 'todos' || section === 'global')
}
