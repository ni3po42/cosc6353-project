module.exports = {
  entry: __dirname  + '/src/WebApp/components/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: __dirname +'/src/WebApp/public/javascripts'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
   resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};