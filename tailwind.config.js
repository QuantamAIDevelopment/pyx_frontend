   /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // Brand Colors
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        
        // UI Colors
        ui: {
          success: "var(--ui-success)",
          warning: "var(--ui-warning)",
          error: "var(--ui-error)",
          info: "var(--ui-info)",
          purple: "var(--ui-purple)",
          cyan: "var(--ui-cyan)",
          lime: "var(--ui-lime)",
          orange: "var(--ui-orange)",
        },
        
        // Status Colors
        status: {
          active: "var(--status-active)",
          pending: "var(--status-pending)",
          inactive: "var(--status-inactive)",
          error: "var(--status-error)",
        },
        
        // Text Colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          white: "var(--text-white)",
        },
        
        // Background Colors
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          muted: "var(--bg-muted)",
          card: "var(--bg-card)",
          overlay: "var(--bg-overlay)",
        },
        
        // Border Colors
        border: {
          light: "var(--border-light)",
          medium: "var(--border-medium)",
          dark: "var(--border-dark)",
        },
        
        // Shadow Colors
        shadow: {
          light: "var(--shadow-light)",
          medium: "var(--shadow-medium)",
          dark: "var(--shadow-dark)",
        },
        
        // Chart Colors
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
          7: "var(--chart-7)",
          8: "var(--chart-8)",
        },
      },
      fontFamily: {
        quncry: ['Quncry', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'var(--brand-primary)',
        'brand-gradient-hover': 'var(--brand-accent)',
        'brand-gradient-via': 'var(--brand-primary)',
        'brand-orange-gradient': 'linear-gradient(to right, #FF620A, #FF8A3D)',
      },
    },
  },
  plugins: [],
}
