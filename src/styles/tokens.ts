/**
 * TATIS Semantic Design Tokens
 * 
 * Primary:
 * - Midnight Indigo: #2D264B
 * - Deep Indigo:     #211C38
 * - Soft Indigo:     #766C9C
 * 
 * Accent:
 * - Neon Sky:        #4ADEDE
 * - Muted Cyan:      #B8F0ED
 * 
 * Background:
 * - Light:           #F7F7FA
 * - White:           #FFFFFF
 * - Dark:            #151421
 * - Dark Surface:    #211F30
 * 
 * Text:
 * - Primary:         #242236
 * - Secondary:       #77758A
 * - Dark Mode Prim:  #F4F3F8
 * - Dark Mode Sec:   #A7A4B8
 * 
 * Status:
 * - Success:         #059669
 * - Warning:         #D97706
 * - Error:           #E11D48
 * - Information:     #2563EB
 */

export const BRAND_COLORS = {
  primary: {
    midnight: '#2D264B',
    deep: '#211C38',
    soft: '#766C9C',
  },
  accent: {
    neonSky: '#4ADEDE',
    mutedCyan: '#B8F0ED',
  },
  background: {
    light: '#F7F7FA',
    white: '#FFFFFF',
    dark: '#151421',
    darkSurface: '#211F30',
  },
  text: {
    lightPrimary: '#242236',
    lightSecondary: '#77758A',
    darkPrimary: '#F4F3F8',
    darkSecondary: '#A7A4B8',
  },
  status: {
    success: '#059669',
    warning: '#D97706',
    error: '#E11D48',
    info: '#2563EB',
  },
} as const;
