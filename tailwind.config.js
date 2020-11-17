module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#222a30',
        'brand-gray': '#333c45',
        'brand-blue': '#849FB1',
        'brand-red': '#F71117',
      },
    },
  },
  variants: {},
  plugins: [],
};
