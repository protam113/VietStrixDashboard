import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
    },
    extend: {
      colors: {
        background: '(var(--background))',
        foreground: 'hsl(var(--foreground))',

        'primary-logo': 'var(--primary-logo)',
        'primary-900': 'var(--primary-900)',
        'primary-800': 'var(--primary-800)',
        'primary-700': 'var(--primary-700)',
        'primary-600': 'var(--primary-600)',
        'primary-500': 'var(--primary-500)',
        'primary-400': 'var(--primary-400)',
        'primary-300': 'var(--primary-300)',
        'primary-200': 'var(--primary-200)',
        'primary-100': 'var(--primary-100)',

        'neutral-900': 'var(--neutral-900)',
        'neutral-800': 'var(--neutral-800)',
        'neutral-700': 'var(--neutral-700)',
        'neutral-600': 'var(--neutral-600)',
        'neutral-500': 'var(--neutral-500)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-100': 'var(--neutral-100)',

        black: 'var(--black)',
        white: 'var(--white)',

        'albert-success': 'var(--albert-success)',
        'albert-error': 'var(--albert-error)',
        'albert-warning': 'var(--albert-warning)',
        'albert-noti': 'var(--albert-noti)',

        'secondary-900': 'var(--secondary-900)',
        'secondary-800': 'var(--secondary-800)',
        'secondary-700': 'var(--secondary-700)',
        'secondary-600': 'var(--secondary-600)',
        'secondary-500': 'var(--secondary-500)',
        'secondary-400': 'var(--secondary-400)',
        'secondary-300': 'var(--secondary-300)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-100': 'var(--secondary-100)',
        'secondary-50': 'var(--secondary-50)',

        'primary-border-50': 'var(--primary-border-50)',
        'custom-blue': 'var(--custom-blue)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
