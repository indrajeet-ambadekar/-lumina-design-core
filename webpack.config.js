const path = require('path');
const fs = require('fs');

// Get all component names
const componentsDir = path.resolve(__dirname, 'src/components');
const componentNames = fs.readdirSync(componentsDir).filter(file =>
  fs.statSync(path.join(componentsDir, file)).isDirectory()
);

const entries = componentNames.reduce((acc, component) => {
  acc[component] = `./src/components/${component}/index.js`;
  return acc;
}, { index: './src/index.js' });
console.log(entries)
module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'MyReactLibrary',
    libraryTarget: 'umd',
    globalObject: 'this',
    // Ensuring that each export works correctly
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Turns CSS into CommonJS
          'sass-loader',  // Compiles Sass to CSS
        ],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
