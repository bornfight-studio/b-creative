# B-CREATIVE

BORNFIGHT STUDIO® project template based on webpack, es6 and scss

![GitHub package.json version](https://img.shields.io/github/package-json/v/bornfight/b-creative?style=flat-square)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/bornfight/b-creative?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/bornfight/b-creative?style=flat-square)
![GitHub](https://img.shields.io/github/license/bornfight/b-creative?style=flat-square)

## Installation

Module has not yet been published on npm. Currently we are using it as local npm module.

```bash
npm install -g yo
git clone git@github.com:bornfight/b-creative.git
cd b-creative 
npm install
npm link
```

`npm link` will install your cloned repo as a global module, as if it was installed through public npm repository. 
You can read more about it [here](https://yeoman.io/authoring/).

Then generate your new project by running command `yo b-creative` and follow the instructions. 
The generator will prompt you with some additional info, but recommended way of generating a new project is that you first `cd` into project you want the scaffold to be output. 

## Usage

The generator is based on modern tools and architectures that fit most of "multi page" and "single page" websites.

### Webpack based build system 

 - [webpack](https://webpack.js.org) v5
 - [browsersync](https://browsersync.io/) for live reload as [webpack plugin](https://www.npmjs.com/package/browser-sync-webpack-plugin)

### (S)CSS

- based on **ITCSS** architecture (read about it [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) and inspired by [inuitcss framework](https://github.com/inuitcss/inuitcss)
- uses postcss by default - autoprefixer will automatically add vendor prefixes by [browserslist ruleset defined inside package.json](https://github.com/postcss/autoprefixer#browsers)
   
### Scripts

```bash
npm run build # build for production
npm run dev # build and watch file changes for development
npm run format # format scss and js files with prettier
npm run lint:scss # lint scss files with stylelint
npm run prepare # install husky hooks
```

## License

MIT © [BORNFIGHT STUDIO®](https://www.bornfight.studio)
