// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // "plugins": {
  //   "postcss-import": {},
  //   "postcss-url": {},
  //   "tailwindcss": tailwindcss,
  //   "autoprefixer": {}
  // }
  "plugins" : [
    require('postcss-import'),
    require('tailwindcss'),
    // require('postcss-url'),
    require('autoprefixer'),
  ]
}
