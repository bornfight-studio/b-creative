# generator-b-creative
> Bornfight frontend project template based on gulp, es6 and scss

## ⚠ IMPORTANT NOTICE - module not yet published on npm ⚠

## Installation

First, install [Yeoman](http://yeoman.io) and generator-b-creative using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

**As the module is not yet published (for dev purposes), we are using local npm module installation.**

```bash
1. npm install -g yo
2. git clone git@github.com:bornfight/b-creative.git
3. cd b-creative 
4. npm install
5. npm link
```

`npm link` will install your cloned repo as a global module, as if it was installed through public npm repository. 
You can read more about it [here](https://yeoman.io/authoring/).

Then generate your new project by running command `yo generator-b-creative` and follow the instructions. 
The generator will prompt you with some additional info, but recommended way of generating a new project is that you first `cd` into project you want the scaffold to be output. 

## Usage

The generator is based on modern tools and architectures that fit most of "multi page" websites. 

#### Webpack based build system 
 - support for dev and production environments - read more [here](https://atendesigngroup.com/blog/managing-dev-and-production-builds-webpack) 
 - [browsersync](https://browsersync.io/) for live reload
     
#### (S)CSS
- based on **ITCSS** architecture (read about it [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) and inspired by [inuitcss framework](https://github.com/inuitcss/inuitcss)
- sassbox (scss functions/mixins module)is installed by default, but it's not imported in main style.scss file. For docs and installation, [read this](https://github.com/degordian/sassbox).
- uses postcss by default - autoprefixer will automatically add vendor prefixes by [browserslist ruleset defined inside package.json](https://github.com/postcss/autoprefixer#browsers)

   
#### Scripts
```bash
npm run dev - dev environent with browsersync
npm run build - build production
npm run build:analyze - builds production creates an informational page about your js bundles
```

## License

MIT © [Bornfight](https://www.bornfight.com)

[npm-image]: https://badge.fury.io/js/generator-b-creative.svg
[npm-url]: https://npmjs.org/package/generator-b-creative
[travis-image]: https://travis-ci.org/bornfight/generator-b-creative.svg?branch=master
[travis-url]: https://travis-ci.org/bornfight/generator-b-creative
[daviddm-image]: https://david-dm.org/bornfight/generator-b-creative.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bornfight/generator-b-creative
