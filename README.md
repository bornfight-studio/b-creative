<a href="http://www.bornfight.com">
<img width="84px" src="https://www.bornfight.com/wp-content/themes/bf/static/ui/BF-sign-dark.svg?" title="Bornfight" alt="Bornfight">
</a>

# b-creative
> Bornfight frontend project template based on gulp, es6 and scss

![GitHub package.json version](https://img.shields.io/github/package-json/v/bornfight/b-creative?style=flat-square)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/bornfight/b-creative?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/bornfight/b-creative?style=flat-square)
![GitHub](https://img.shields.io/github/license/bornfight/b-creative?style=flat-square)

##### ⚠ IMPORTANT NOTICE - module not yet published on npm ⚠

## Installation

First, install [Yeoman](http://yeoman.io) and b-creative using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

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

Then generate your new project by running command `yo b-creative` and follow the instructions. 
The generator will prompt you with some additional info, but recommended way of generating a new project is that you first `cd` into project you want the scaffold to be output. 

## Usage

The generator is based on modern tools and architectures that fit most of "multi page" websites. 

#### Gulp based build system 
 - [Gulp](https://gulpjs.com/) 4 used
 - [browsersync](https://browsersync.io/) for live reload
     
#### (S)CSS
- based on **ITCSS** architecture (read about it [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) and inspired by [inuitcss framework](https://github.com/inuitcss/inuitcss)
- uses postcss by default - autoprefixer will automatically add vendor prefixes by [browserslist ruleset defined inside package.json](https://github.com/postcss/autoprefixer#browsers)

   
#### Scripts
```bash
npm run dev - dev environent with browsersync
npm run build - build production
npm run build:analyze - builds production creates an informational page about your js bundles
```

## License

MIT © [Bornfight](https://www.bornfight.com)
