const gulp = require('gulp')
const createTasks = require('our-gulp')

const isProd = process.env.NODE_ENV === 'production'

const CDN_ASSET_PREFIX = ''
const LOCAL_ASSET_PREFIX = ''

const assetUrlPrefix = isProd ? CDN_ASSET_PREFIX : LOCAL_ASSET_PREFIX

createTasks(gulp, {
  assetUrlPrefix: assetUrlPrefix,
  basePath: __dirname + '/',
  sassIncludePaths: [
    'src/css',
    'node_modules/foundation-sites/scss',
    'node_modules/revelry-components/scss',
  ]
})
