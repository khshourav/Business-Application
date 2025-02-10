import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
          colors: {
            'primary': '#013e7d', // Dark blue
            'secondary': '#18cea4', // Teal
            'accent': '#ffffff', // White
            'transparent-secondary': 'rgba(137, 229, 225, 0.9)', // Semi-transparent teal
            'text-primary': '#013e7d', // Dark blue for text
            'text-secondary': '#89e5e1', // Teal for text
            'text-gray': '#4a5568', // Gray for text

          },
          textColor: {
            'primary': '#013e7d',
            'secondary': '#18cea4',
            'accent': '#ffffff',
          },
          backgroundColor: {
            'primary': '#013e7d',
            'secondary': '#18cea4',
            'accent': '#ffffff',
            'nice': '#adbfea',
            'transparent-secondary': 'rgba(137, 229, 225, 0.9)', // New semi-transparent teal
            'transparent-accent': 'rgba(255, 255, 255, .9)',
          },
          borderColor: {
            'primary': '#013e7d',
            // 'secondary': '#89e5e1',
            'secondary': '#18cea4',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'], // Example font family
          },
          keyframes: {
            'fade-in-up': {
              '0%': {
                opacity: '0',
                transform: 'translateY(100px)',
              },
              '100%': {
                opacity: '1',
                transform: 'translateY(0)',
              },
            },
          },
          animation: {
            'fade-in-up': 'fade-in-up 1s ease-out forwards', // Increased duration to 2s
          },
        },
      },

    plugins: [forms],
};
