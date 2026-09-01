import logoCamara from '@/assets/camaraDiputados.png'

/**
 * FUENTE ÚNICA DE VERDAD del sistema.
 * Centro de Comando Inteligente — H. Cámara de Diputados, LXVI Legislatura.
 * Cambia aquí marca, colores, tipografía y logos. NO hardcodees estos
 * valores en componentes: usa las variables CSS (var(--color-primary), etc.)
 * que theme.js genera a partir de este archivo.
 */
export const config = {
  brand: {
    name: 'Centro de Comando — Cámara de Diputados',
    shortName: 'Cámara',
    logo: logoCamara,
    logoAlt: logoCamara,
    favicon: logoCamara,
  },

  // Tipografía. Inter desde Google Fonts (link en index.html).
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    baseSize: '15px',
  },

  // ─── Paleta Institucional — Cámara de Diputados ────────────────────────────
  // Verde institucional oscuro como acento principal.
  // Fondo blanco/gris muy claro. Dorado lima como highlight.
  // Texto oscuro para máxima legibilidad.
  colors: {
    // ── Verde Principal Cámara ───────────────────────────────────────────────
    primary:       '#02735E',
    primaryDark:   '#08261E',
    primarySoft:   'rgba(2, 115, 94, 0.08)',
    primaryGlow:   'rgba(2, 115, 94, 0.22)',
    // ── Verde Medio (secciones y paneles) ────────────────────────────────────
    accent:        '#D6D989',   // dorado/lima institucional — highlights
    accentSoft:    'rgba(214, 217, 137, 0.15)',
    accentGlow:    'rgba(214, 217, 137, 0.25)',
    // ── Verde Sidebar / Paneles Profundos ────────────────────────────────────
    deep:          '#36594F',
    deepSoft:      'rgba(54, 89, 79, 0.12)',
    // ── Fondos (Gris Muy Claro / Blanco) ────────────────────────────────────
    bg:            '#F2F2F2',   // fondo general 90%
    surface:       'rgba(255, 255, 255, 0.94)',
    surfaceHover:  'rgba(2, 115, 94, 0.04)',
    surfaceGlass:  'rgba(255, 255, 255, 0.82)',
    surfaceDeep:   '#EAECEC',
    // ── Texto ────────────────────────────────────────────────────────────────
    ink:           '#0D1117',
    graphite:      '#2D3748',
    graySoft:      'rgba(0,0,0,0.03)',
    text:          '#1A202C',
    textMuted:     '#4A5568',
    textDim:       '#A0AEC0',
    // ── Bordes ───────────────────────────────────────────────────────────────
    border:        'rgba(2, 115, 94, 0.12)',
    borderGlow:    'rgba(2, 115, 94, 0.30)',
    sidebarBg:     '#08261E',   // sidebar muy oscuro institucional
    headerBg:      'transparent',
    // ── Semánticos de Seguridad ───────────────────────────────────────────────
    green:         '#02735E',
    greenGlow:     'rgba(2, 115, 94, 0.22)',
    red:           '#C53030',
    redGlow:       'rgba(197, 48, 48, 0.22)',
    orange:        '#C05621',
    orangeGlow:    'rgba(192, 86, 33, 0.20)',
    blue:          '#2B6CB0',
    blueGlow:      'rgba(43, 108, 176, 0.18)',
    yellow:        '#D6D989',
    yellowGlow:    'rgba(214, 217, 137, 0.25)',
    // ── HUD ──────────────────────────────────────────────────────────────────
    gridLine:      'rgba(2, 115, 94, 0.06)',
    hudAccent:     '#02735E',
    hudAccentGlow: 'rgba(2, 115, 94, 0.18)',
  },

  layout: {
    sidebarWidth:         '248px',
    sidebarWidthCollapsed:'64px',
    headerHeight:         '56px',
    radius:               '10px',
    radiusLg:             '16px',
  },
}

export default config
