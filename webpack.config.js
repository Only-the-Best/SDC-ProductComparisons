const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"] // resolves all .jsx and .js files so that you don't need these extensions when you import in other files.
  }
};

const client = {
  entry: { code: `${__dirname}/client/src/index.jsx` },
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'productComparison.js'
  },
};

const server = {
  entry: { code: `${__dirname}/server/index.js` },
  target: 'node',
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'productComparison-server.js',
    libraryTarget: 'commonjs-module'
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ]
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];

// module.exports = {
//   entry: { code: `${__dirname}/client/src/index.jsx` },
//   module: {
//     rules: [
//       {
//         test: [/\.jsx$/],
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-react", "@babel/preset-env"]
//           }
//         }
//       }
//     ]
//   },
//   output: {
//     filename: "[name][contenthash]bundle.js",
//     path: `${__dirname}/client/dist`,
//     publicPath: "/"
//   },
//   resolve: {
//     extensions: [".jsx", ".js"] // resolves all .jsx and .js files so that you don't need these extensions when you import in other files.
//   },
//   plugins: [
//     // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
//     new HtmlWebpackPlugin({
//       title: "Caching",
//       template: "indexTemplate.html"
//     })
//   ],
//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "nodeModules",
//           chunks: "all"
//         }
//       }
//     }
//   }
// };
// //////////////////////
// const webpack = require('webpack');
// const path = require('path');

// // See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

// const common = {
//   context: __dirname + '/client',
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'env']
//         },
//       },
//     ],
//   }
// };

// const client = {
//   entry: './client.js',
//   output: {
//     path: __dirname + '/public',
//     filename: 'app.js'
//   }
// };

// const server = {
//   entry: './server.js',
//   target: 'node',
//   output: {
//     path: __dirname + '/public',
//     filename: 'app-server.js',
//     libraryTarget: 'commonjs-module'
//   }
// };

// module.exports = [
//   Object.assign({}, common, client),
//   Object.assign({}, common, server)
// ];
