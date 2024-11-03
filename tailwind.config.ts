import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
// @ts-ignore
import patterns from 'tailwindcss-bg-patterns';
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'party-blue': '#1019EC',
        'party-red': '#EC1014',

        // Background colors
        'background-light': '#F9FAFB',
        'background-dark': '#121212',
        'background-accent': '#D1E9FD',
        'secondary-background': '#F3F4F6',

        // Primary colors
        'primary-black': '#1A1A1A',
        'primary-white': '#FFFFFF',
        'primary-blue': '#1019EC',

        // Secondary colors
        'dark-blue': '#1A1EBF',
        'light-blue': 'rgba(16, 25, 236, 0.6)',
        'line-blue': '#000AFF1F',

        // Gray scale
        'light-gray': '#F3F4F6',
        'mid-gray': '#D1D5DB',
        'dark-gray': '#6B7280',
        'line-gray': '#E5E7EB',

        // Text colors
        primary: '#1A1A1A',
        secondary: '#4B5563',
        muted: '#9CA3AF',

        // Success/Warning/Error colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',

        // Dark Mode Adjustments
        'dark-mode-text': '#F0F0F0',
        'dark-mode-background': '#121212',
        'dark-mode-accent': '#242424',

        gray: colors.zinc,
        'modal-background': {
          light: '#FFFFFF',
        },
        // You can add more custom colors if needed
      },
      backgroundColor: {
        white: '#FFFFFF',
        black: '#1A1A1A',
        hero: '#18181B',
        simulation: '#C6C4C2',
        insights: '#B1B1B1',
        humanity: '#FFFFFF',
        future: '#18181B',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.8125rem', { lineHeight: '1.25rem' }],
        base: ['0.9375rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        hero: ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      transitionProperty: {
        none: 'none',
        all: 'all',
        DEFAULT:
          'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
        colors: 'background-color, border-color, color, fill, stroke',
        opacity: 'opacity',
        shadow: 'box-shadow',
        transform: 'transform',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '2000': '2000ms',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '164': '41rem',
      },
      animation: {
        'fast-pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-in forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'slide-out': 'slideOut 0.5s ease-in forwards',
        'fade-in-scale': 'fadeInScale 0.3s ease-out forwards',
        'fade-out-scale': 'fadeOutScale 0.3s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOutScale: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
      },
      zIndex: {
        '1': '1',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      lineHeight: {
        relaxed: '1.75',
        snug: '1.375',
        tight: '1.25',
      },
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
      fontFamily: {
        sans: ['var(--font-abc-oracle)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        serif: ['var(--font-gt-pantheon)', 'serif'],

        oracle: ['var(--font-abc-oracle)'],
        pantheon: ['var(--font-gt-pantheon)'],
        geist: ['var(--font-geist-mono)'],
        light: ['var(--font-abc-oracle)'],
        book: ['var(--font-abc-book)'],
        rg: ['var(--font-gt-pantheon)'],
        lt: ['var(--font-gt-pantheon)'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [
    aspectRatio,
    typography,
    animate,
    patterns,
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow:
            '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        },
      };
      addUtilities(newUtilities);
    },
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
