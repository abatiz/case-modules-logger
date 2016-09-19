var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')

// build paths where we output our results
var outPath = {
  docs: './docs/'
}

// adapt this to your source code location
var jsDocInput = {
  src: './lib',
  index: './index.js',
  readme: './README.md',
  jsDoc: './jsdoc'
}

/**
 * Create the docs
 */
gulp.task('create docs', function (cb) {
  // use require to load the jsdoc config;
  // note the extension is discarted when loading json with require!
  const config = require(jsDocInput.jsDoc)
  config.opts.destination = outPath.docs

  gulp.src([jsDocInput.readme, jsDocInput.index, jsDocInput.src + '/**/*.js'])
        .pipe(jsdoc(config, cb))
})
