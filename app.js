const cssStandards = require('spike-css-standards');
const latest = require('babel-preset-env');
const reshape = require('reshape');
const include = require('reshape-include');
const layouts = require('reshape-layouts');
const content = require('reshape-content');
const expressions = require('reshape-expressions');
const minify = require('reshape-minify');

const listings = require('./data/listings.json');

module.exports = {
  devtool: 'source-map',
  ignore: [
    'views/layout.html',
    'views/partials/*',
    'data/*',
    '.github/*',
    'Readme.md',
    'LICENSE',
    's3_website.yml',
    '**/_*',
    '**/.*',
    '*.log',
  ],
  reshape: {
    locals: {
      defaultTitle: 'JuniorJobs - Entry level jobs in UK tech/design',
      jobs: listings
    },
    plugins: [
      layouts(),
      content(),
      include(),
      expressions(),
      minify({
        minifyJs: false // UglifyJS doesn't support ES6 :/
      })
    ]
  },
  postcss: cssStandards({
    parser: false,
    minify: true
  }),
  babel: { presets: [latest] }
};
