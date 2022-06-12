module.exports = {
  // add the folders and files from your templates
  content: ['./src/**/*.{html,js}'],

  // make sure to safelist these classes when using purge
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg',
    'justify-center',
    'items-center',
    'flex',
    'bg-gray-900',
    'bg-opacity-50',
    'dark:bg-opacity-80',
    'fixed',
    'inset-0',
    'z-40',
    'duration-300',
  ],

  // enable dark mode via class strategy
  darkMode: 'class',

  theme: {
    extend: {
      // extend base Tailwind CSS utility classes
      colors: {
        light: '#d3d6da',
        correct: '#538d4e',
        contain: '#b59f3b',
        incorrect: '#3a3a3c',
        primary: '#222831',
        dark: '#121213',
        'gray-8': '#818384',
        'gray-5': '#565758',
        'dark-8': '#121213',
      },

      fontFamily: {
        inherit: 'inherit',
        asap: "'Asap', sans-serif",
      },

      minWidth: {
        57: '57px',
      },

      maxWidth: {
        350: '350px',
        57: '57px',
        'xs-21': '21rem',
      },

      margin: {
        1.25: '5px',
        0.75: '3px',
      },

      padding: {
        100: '100%',
        5.5: '18px',
      },

      flexGrow: {
        10: '10',
      },

      flexBasis: {
        11.5: '8%',
      },

      lineHeight: {
        inherit: 'inherit',
      },

      height: {
        15: '60px',
      },

      minHeight: {
        75: '75vh',
      },

      width: {
        '12/13': '95%',
      },

      animation: {
        pop: 'pop 0.25s ease-in-out 1 forwards',
        grow: 'grow 0.25s ease-out 1 forwards',
        pulse: 'pulse 1.5s linear infinite forwards',
      },

      keyframes: {
        pop: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.15)',
          },
        },

        grow: {
          '0%': {
            transform: 'scaleY(0)',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },

        pulse: {
          '0%, 30%, 50%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '20%,40%': {
            transform: 'scale(1.2)',
          },
        },
      },
    },
  },

  plugins: [require('flowbite/plugin')],
};
