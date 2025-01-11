

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-gradient': `
          radial-gradient(at 17% 0%, hsla(281deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 98% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 33% 87%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 65% 86%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 61% 21%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 36% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 31% 31%, hsla(248deg, 100%, 66%, 0.8) 0, transparent 50%),
          radial-gradient(at 42% 32%, hsla(248deg, 83%, 76%, 1) 0, transparent 50%),
          radial-gradient(at 0% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 10% 66%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 64% 56%, hsla(166deg, 80%, 55%, 1) 0, transparent 50%),
          radial-gradient(at 68% 46%, hsla(180deg, 43%, 53%, 1) 0, transparent 50%),
          radial-gradient(at 99% 98%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%),
          radial-gradient(at 67% 59%, hsla(194deg, 100%, 73%, 1) 0, transparent 50%)
        `,
      },
      animation: {
        blink: 'blink 1.5s infinite', // Define the blink animation
        bgBlink: 'bgBlink 1.5s infinite',
        shake: 'shake 0.5s ease-in-out infinite', // Custom animation
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        },
        bgBlink: {
          '0%, 100%': { backgroundColor: '#f3d46f', color: '#000000',  }, // Tailwind blue-500
          '50%': { backgroundColor: '#63682f', color: '#ffffff',  },    // Tailwind gray-400
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
    },
  },
  plugins: [],
});