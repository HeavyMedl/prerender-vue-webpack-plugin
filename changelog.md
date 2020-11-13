# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2020-11-13

### Changed

- Removed `vue-server-renderer` as a direct dependency of the plugin as clients versions of `vue-loader`/`vue-template-compiler` may cause build conflicts. The package is now defined as a peer dependency.  `PrerenderVueWebpackPlugin` is now a default export.

```javascript
const PrerenderVueWebpackPlugin = require('prerender-vue-webpack-plugin');
```
