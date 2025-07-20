// Color Constants
export const COLORS = {
  // Brand Colors
  BRAND_PRIMARY: '#FF620A',
  BRAND_SECONDARY: '#993B06',
  BRAND_ACCENT: '#D94B05',
  
  // UI Colors
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  PURPLE: '#8b5cf6',
  CYAN: '#06b6d4',
  LIME: '#84cc16',
  ORANGE: '#f97316',
  
  // Status Colors
  ACTIVE: '#10b981',
  PENDING: '#f59e0b',
  INACTIVE: '#6b7280',
  STATUS_ERROR: '#ef4444',
  
  // Text Colors
  TEXT_PRIMARY: '#1a1a2e',
  TEXT_SECONDARY: '#6b7280',
  TEXT_MUTED: '#9ca3af',
  TEXT_WHITE: '#ffffff',
  
  // Background Colors
  BG_PRIMARY: '#ffffff',
  BG_SECONDARY: '#f9fafb',
  BG_MUTED: '#f1f2f4',
  BG_CARD: '#ffffff',
  BG_OVERLAY: 'rgba(0, 0, 0, 0.5)',
  
  // Border Colors
  BORDER_LIGHT: 'rgba(0, 0, 0, 0.1)',
  BORDER_MEDIUM: 'rgba(0, 0, 0, 0.15)',
  BORDER_DARK: 'rgba(0, 0, 0, 0.2)',
  
  // Shadow Colors
  SHADOW_LIGHT: 'rgba(0, 0, 0, 0.1)',
  SHADOW_MEDIUM: 'rgba(0, 0, 0, 0.15)',
  SHADOW_DARK: 'rgba(0, 0, 0, 0.25)',
  
  // Chart Colors
  CHART_1: '#3b82f6',
  CHART_2: '#10b981',
  CHART_3: '#f59e0b',
  CHART_4: '#ef4444',
  CHART_5: '#8b5cf6',
  CHART_6: '#06b6d4',
  CHART_7: '#84cc16',
  CHART_8: '#f97316',
} as const;

// Gradient Utilities
export const GRADIENTS = {
  BRAND: 'linear-gradient(90deg, #FF620A 0%, #993B06 100%)',
  BRAND_HOVER: 'linear-gradient(90deg, #993B06 0%, #FF620A 100%)',
  BRAND_VIA: 'linear-gradient(90deg, #FF620A 0%, #D94B05 50%, #993B06 100%)',
} as const;

// Tailwind Class Utilities
export const TAILWIND_CLASSES = {
  // Brand Colors
  BRAND_PRIMARY: 'bg-brand-primary',
  BRAND_SECONDARY: 'bg-brand-secondary',
  BRAND_ACCENT: 'bg-brand-accent',
  TEXT_BRAND_PRIMARY: 'text-brand-primary',
  TEXT_BRAND_SECONDARY: 'text-brand-secondary',
  
  // UI Colors
  SUCCESS: 'bg-ui-success',
  WARNING: 'bg-ui-warning',
  ERROR: 'bg-ui-error',
  INFO: 'bg-ui-info',
  PURPLE: 'bg-ui-purple',
  CYAN: 'bg-ui-cyan',
  LIME: 'bg-ui-lime',
  ORANGE: 'bg-ui-orange',
  
  // Status Colors
  ACTIVE: 'bg-status-active',
  PENDING: 'bg-status-pending',
  INACTIVE: 'bg-status-inactive',
  STATUS_ERROR: 'bg-status-error',
  
  // Text Colors
  TEXT_PRIMARY: 'text-text-primary',
  TEXT_SECONDARY: 'text-text-secondary',
  TEXT_MUTED: 'text-text-muted',
  TEXT_WHITE: 'text-text-white',
  
  // Background Colors
  BG_PRIMARY: 'bg-bg-primary',
  BG_SECONDARY: 'bg-bg-secondary',
  BG_MUTED: 'bg-bg-muted',
  BG_CARD: 'bg-bg-card',
  
  // Border Colors
  BORDER_LIGHT: 'border-border-light',
  BORDER_MEDIUM: 'border-border-medium',
  BORDER_DARK: 'border-border-dark',
  
  // Gradients
  BRAND_GRADIENT: 'bg-brand-gradient',
  BRAND_GRADIENT_HOVER: 'bg-brand-gradient-hover',
  BRAND_GRADIENT_VIA: 'bg-brand-gradient-via',
} as const;

// Common Button Classes
export const BUTTON_CLASSES = {
  PRIMARY: 'bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-lg shadow hover:shadow-md transition-all',
  SECONDARY: 'bg-bg-secondary hover:bg-bg-muted text-text-primary font-bold rounded-lg border border-border-medium hover:border-border-dark transition-all',
  SUCCESS: 'bg-ui-success hover:bg-green-600 text-white font-bold rounded-lg shadow hover:shadow-md transition-all',
  WARNING: 'bg-ui-warning hover:bg-yellow-600 text-white font-bold rounded-lg shadow hover:shadow-md transition-all',
  ERROR: 'bg-ui-error hover:bg-red-600 text-white font-bold rounded-lg shadow hover:shadow-md transition-all',
  GRADIENT: 'bg-brand-gradient hover:bg-brand-gradient-hover text-white font-bold rounded-lg shadow hover:shadow-md transition-all',
} as const;

// Common Card Classes
export const CARD_CLASSES = {
  DEFAULT: 'bg-bg-card border border-border-medium rounded-2xl p-6 shadow-2xl',
  HOVER: 'bg-bg-card border border-border-medium rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300',
  MUTED: 'bg-bg-muted border border-border-light rounded-2xl p-6 shadow-lg',
} as const;

// Utility Functions
export const getColorClass = (color: keyof typeof COLORS, type: 'bg' | 'text' | 'border' = 'bg') => {
  const colorValue = COLORS[color];
  switch (type) {
    case 'bg':
      return `bg-[${colorValue}]`;
    case 'text':
      return `text-[${colorValue}]`;
    case 'border':
      return `border-[${colorValue}]`;
    default:
      return `bg-[${colorValue}]`;
  }
};

export const getGradientClass = (gradient: keyof typeof GRADIENTS) => {
  const gradientValue = GRADIENTS[gradient];
  return `bg-gradient-to-r from-[${gradientValue}]`;
};

// Type exports for TypeScript
export type ColorKey = keyof typeof COLORS;
export type GradientKey = keyof typeof GRADIENTS;
export type TailwindClassKey = keyof typeof TAILWIND_CLASSES;
export type ButtonClassKey = keyof typeof BUTTON_CLASSES;
export type CardClassKey = keyof typeof CARD_CLASSES; 