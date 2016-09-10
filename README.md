# blaupause ![Travis](https://img.shields.io/travis/fspoettel/blaupause.svg?maxAge=2592000?style=flat-square)

> Blaupause is a developer-friendly Hugo starter kit based around gulp-tasks. It comes es6-ready with several helpers for SVG and fonts and a nice basic structure for the html, scss and javascript. For a detailed listing of what is included, see "In the box".

## Installation

This project depends on [Hugo](https://gohugo.io) and [Node](http://nodejs.org/) being installed on your machine. To initiate a new site, do:

1. `git clone https://github.com/felics/blaupause project`
2. `cd project`
3. `npm install`
4. `gulp`

## In the box

* [Gulp](http://gulpjs.com/)-based builds
* [BrowserSync](http://www.browsersync.io/) live-reloading environment
* Developer mode with `Sourcemaps`
* `Production`-mode for optimized builds

### JS

* [Webpack](http://webpack.github.io)
* [Babel](babeljs.io)
* [ESLint](http://eslint.org/)
* [Ava with jsdom for unit tests](https://github.com/avajs/ava)
* [Customizable Modernizr](http://modernizr.com/)

### SCSS

* [SASS](http://sass-lang.com/)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Stylelint](http://stylelint.io/)
* (Optional) SASS boilerplate based on [SASS Guidelines](https://sass-guidelin.es/) and [Sanitize.css](https://github.com/10up/sanitize.css) with a couple of useful mixins

### Static Site Generator

* [Hugo*](https://gohugo.io) with a basic [HTML5 Boilerplate](https://html5boilerplate.com/) layout and partials (e.g. a SVG sprite helper)
* Useful recipes for common tasks in the README

### Images / SVG

* [svg-sprite](https://github.com/jkphl/svg-sprite)
* [imagemin](https://github.com/imagemin/imagemin)

### And the rest

* [Travis](https://travis-ci.org)-based tests
* [EditorConfig](http://editorconfig.org/)
* (Example) Automatic Travis deployment to Github Pages

\* Due to the structure of this repository, **Hugo Themes are not supported**.

## Available Tasks

* `gulp` Builds the project files, starts BrowserSync and server(if wanted) and watches for changes to project files.
* `gulp build` (Re-)Builds project
* `gulp build:clean` Cleans destination folder
* `gulp copy:build` Copies arbitrary files to a destination
* `gulp hugo:build` Builds markup via Hugo
* `gulp images:build` Optimize images
* `gulp images:clean` Clean images
* `gulp modernizr:build` Build a custom Modernizr (Add feature-tests in `./gulp/config.js`)
* `gulp modernizr:clean` Clean custom Modernizr
* `gulp styles:build` Builds styles
* `gulp styles:clean` Clean styles
* `gulp scripts:build` Builds scripts
* `gulp scripts:clean` Clean scripts
* `gulp svg:build` Optimizes SVGs and creates a symbol-sprite
* `gulp svg:clean` Clean symbol-sprite

## Production Builds

You can generate a production-ready build ("real" BaseURL, no drafts, no sourcemaps, `NODE_ENV = "production"` for JS builds, uglified code) by passing `-p` to any build task.

## Configuration

The build configuration is done in `./internals/gulp/config.js` and `./hugo/config.yaml`. A breakdown of the most important keys:

``` yaml
# ./hugo/config.yaml

# The baseurl of the build artifact. Note that this is ignored in development mode
baseurl: "http://fspoettel.github.io/blaupause/"

# The rest of the file is a "normal" Hugo config. Check the hugo docs to see how it works if you are not familiar with it
```

``` js
// ./gulp/config.js

// The directory that will contain the built page
const destinationPath = 'public';
// The directory that will contain all assets (css, js, img)
const assetPath = `${destinationPath}/static`;
// The source path that contains sass, es6 etc
const sourcePath = 'src';

// Changes the port and address the development server will be run at. Also changes Hugo `baseurl` in dev-mode
const host = 'localhost';
const port = process.env.PORT || 3000;

// The rest of the file contains task specific configuration that you can tailor to your use-case
```
## Hugo

The static site generation is done by [Hugo](https://gohugo.io). The content and configuration is organized in `./hugo` and the layouts can be found in `./src/layouts`. Make sure to adjust `layoutdir` in `./hugo/config.yaml` if you decide to change `sourcePath` in the gulp-config.

### Hugo Partials

#### image/svg

Reference a SVG-symbol from `/static/svg/sprite.symbol.svg#` by ID. SVGs are generated by `gulp svg:build` in the default build.

``` html
  <div class="icon">{{ partial "image/svg" (dict "id" "the-icon" "class" "optional-class") }}</div>
```

## Recipes

To keep the boilerplate as lean as possible, common tools such as jQuery have not been included in the base boilerplate as they are not needed for every use-case. The following recipes show how these tools can be integrated into the boilerplate efficiently.

### Adding jQuery with a fallback

``` bash
# Install jquery from npm
npm install --save jquery
```

``` js
// ./internals/gulp/config.js

const scripts = {
  // Allows you to import jQuery in your js files without adding it to your webpack bundle
  externals: {
    jquery: 'jQuery'
  },
};

// Copy the latest jQuery from node_modules to static/scripts/vendor
const copy = [
  {
    sourcePath: './node_modules/jquery/dist/jquery.min.js',
    destinationPath: `${assetPath}/scripts/vendor`,
  },
];
```

``` html
<!-- hugo/layouts/partial/html_foot.html -->
<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
<script>window.jQuery || document.write('<script src="{{ "static/scripts/vendor/jquery.min.js" | relURL }}"><\/script>')</script>
```

``` js
// Use it in your bundle
import $ from 'jquery';

$(body).addClass('done');
```

## Adding tasks

You can add tasks by creating a `.js`-file in `.internals/gulp/tasks` that contains a task, a reference to `gulp` and the `gulp`-modules you want to use. You can then add it to the run-sequence in `build`.

## Deploy

The build product can be deployed practically anywhere since it is just a static html page. This repository serves as an example on how to deploy to `gh-pages`.

* `./hugo/config.yaml{baseurl}` is set to the real path of the site
* Travis is set up to automatically run `./internals/scripts/deploy.sh` after a succesful master-build. `deploy.sh` runs `gulp build -p` and force-pushes the build-folder to the `gh-pages`-branch (for more information on how to set up Travis-deployment to `gh-pages`, check out [steveklabnik/automatically_update_github_pages_with_travis_example](https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example)).
