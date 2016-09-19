var standard = require('mocha-standard')

it('conforms to standard', standard.files([
  'index.js', 'gulpfile.js', 'lib/*.js', 'test/*.js' // Así excluimos los /docs, /coverage…
]))
