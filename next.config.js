// next.config.js

const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Handle CSS and SCSS
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', // Injects styles into DOM
        'css-loader',   // Turns CSS into CommonJS
        'sass-loader',  // Compiles Sass to CSS
      ],
      include: path.resolve(__dirname, 'src'),
    });

    // Ensure that your library can be used without being processed by Next.js
    if (!isServer) {
      config.externals = {
        react: 'react',
        'react-dom': 'react-dom',
      };
    }

    return config;
  },
  // Optional: Add other Next.js configurations if needed
};
