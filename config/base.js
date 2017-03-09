
const { join, resolve } = require('path')
const { loaders, plugins } = require('./webpack')
const root = process.cwd()
const front = join(root, 'front')
const pkg = require(join(root, 'package.json'))
const entry = (name) => join(front, 'view', name, 'index')

module.exports = {
  entry: {
    index: [ entry('index') ],
  },
  output: {
    path: 'app/public',
    publicPath: 'app/public'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
    modules: [
      front,
      join(root, 'node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      join(__dirname, '../node_modules')
    ]
  },
  module: {
    loaders: [
      loaders.css,
      loaders.less(pkg.config.antd.theme)
    ]
  },
  plugins: [
    plugins.PostcssOptions,
    plugins.DllReference(),
    plugins.Assets('app_assets.json')
  ]
}