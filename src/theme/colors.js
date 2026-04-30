/**
 * THEME COLORS — Single source of truth for all colors.
 * Tweak these to change the entire site palette instantly.
 *
 * Dual-tone palette: Soft Indigo + Warm Rose-Gold
 * Glassmorphism-ready with transparency values.
 */

const colors = {
  /* ── Primary Dual-Tone ─────────────────────── */
  primary: '#141414',      // Deep soft indigo
  primaryLight: '#000000',      // Lighter indigo
  primaryPale: '#1e1e1e',      // Very pale lavender
  primaryGlass: 'rgba(70, 164, 169, 0.97)',

  secondary: '#C2955A',      // Warm rose-gold / champagne
  secondaryLight: '#D4AF6A',      // Light gold
  secondaryPale: '#FAF3E8',      // Pale cream-gold
  secondaryGlass: 'rgba(194, 149, 90, 0.1)',

  /* ── Backgrounds ────────────────────────────── */
  bgPrimary: '#FAFBFE',      // Near-white with cool tint
  bgSecondary: '#F4F2FA',      // Lavender mist
  bgTertiary: '#F0ECE3',      // Warm cream
  bgDark: '#1E1A3A',      // Deep purple-navy
  bgDarkMid: '#2A2555',      // Mid dark
  bgDarkCard: 'rgba(255, 255, 255, 0.06)',

  /* ── Glass ──────────────────────────────────── */
  glassBg: 'rgba(255, 255, 255, 0.55)',
  glassBgDark: 'rgba(255, 255, 255, 0.06)',
  glassBorder: 'rgba(255, 255, 255, 0.25)',
  glassBorderDark: 'rgba(255, 255, 255, 0.12)',
  glassBlur: '16px',

  /* ── Text ───────────────────────────────────── */
  text: '#1A1A2E',
  textMuted: '#6B6F82',
  textLight: 'rgba(255, 255, 255, 0.85)',
  textLightMuted: 'rgba(255, 255, 255, 0.55)',
  textLightFaint: 'rgba(255, 255, 255, 0.35)',

  /* ── Borders ────────────────────────────────── */
  border: 'rgba(74, 63, 143, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.15)',
  borderGold: 'rgba(194, 149, 90, 0.25)',

  /* ── Accents (for badges, tags, etc.) ───────── */
  accentOrange: { bg: '#FFF3E0', text: '#E65100', border: '#FFB74D' },
  accentGreen: { bg: '#E8F5E9', text: '#1B5E20', border: '#81C784' },
  accentBlue: { bg: '#E3F2FD', text: '#0D47A1', border: '#64B5F6' },
  accentPurple: { bg: '#EDE7F6', text: '#311B92', border: '#9575CD' },
  accentPink: { bg: '#FCE4EC', text: '#880E4F', border: '#F48FB1' },
  accentTeal: { bg: '#E0F2F1', text: '#004D40', border: '#80CBC4' },

  /* ── Utility ────────────────────────────────── */
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(74, 63, 143, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
};

export default colors;
