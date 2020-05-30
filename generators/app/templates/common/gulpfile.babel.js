import autoprefixer from "gulp-autoprefixer";
import babelify from "babelify";
import browserify from "browserify";
import browserSync from "browser-sync";
import buffer from "vinyl-buffer";
import cleanCSS from "gulp-clean-css";
import del from "del";
import gulp from "gulp";
import rename from "gulp-rename";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import source from "vinyl-source-stream";
import uglify from "gulp-uglify";
import watchify from "watchify";
import { plugins } from "./plugins";

/**
 * Paths object
 */
const paths = {
    styles: {
        main: "static/scss/style.scss",
        src: "static/scss/**/*.scss",
        dest: "static/dist/",
    },
    scripts: {
        main: "static/js/index.js",
        src: "static/js/**/*.js",
        dest: "static/dist/",
    },
    markup: {
        src: "**/*.{html,php}",
    },
    includes: {
        node_modules: ["./node_modules"],
    },
};

/**
 * Read dependencies from plugins.js
 */
const dependencies = plugins;

/**
 * browserSync create
 */
const server = browserSync.create();

/**
 * Clean dist task
 */
export const clean = () => del(["static/dist/*", "!static/dist/vendor.js"]);

/**
 * Watch SCSS task
 */
export function watchStyles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: paths.includes.node_modules }))
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

/**
 * Build SCSS task
 */
export function buildStyles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass({ includePaths: paths.includes.node_modules }))
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
        .pipe(
            rename({
                basename: "style",
            }),
        )
        .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Browserify config for watching files
 */
const browserifyWatch = browserify({
    entries: [paths.scripts.main],
    cache: {},
    packageCache: {},
    plugin: [watchify],
    debug: true,
    transform: [
        babelify.configure({
            presets: ["@babel/preset-env"],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
            ],
        }),
    ],
});
browserifyWatch.external(dependencies);
browserifyWatch.on("update", watchScripts);

/**
 * Watch JS task
 */
export function watchScripts() {
    return browserifyWatch
        .bundle()
        .on("error", console.error)
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(server.stream());
}

/**
 * Browserify config for building files
 */
const browserifyBuild = browserify({
    entries: [paths.scripts.main],
    cache: {},
    packageCache: {},
    debug: true,
    transform: [
        babelify.configure({
            presets: ["@babel/preset-env"],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
            ],
        }),
    ],
});
browserifyBuild.external(dependencies);

/**
 * Build JS task
 */
export function buildScripts() {
    return browserifyBuild
        .bundle()
        .on("error", console.error)
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(
            uglify({
                compress: {
                    pure_funcs: ["console.log"],
                },
            }),
        )
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Build vendor JS
 */
export function buildVendorScripts() {
    return browserify()
        .require(dependencies)
        .transform("babelify", {
            global: true,
            presets: ["@babel/preset-env"],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
            ],
        })
        .bundle()
        .on("error", (err) => console.log(err))
        .pipe(source("vendor.js"))
        .pipe(buffer())
        .pipe(
            uglify({
                compress: {
                    drop_console: true,
                },
            }),
        )
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Reload task
 */
export function reload(done) {
    server.reload();
    done();
}

/**
 * Server init task
 */
export function serve(done) {
    server.init({
        proxy: "<%= vhostName %>/<%= name %>",
        port: 3000,
        host: "localhost",
    });
    done();
}

/**
 * File watcher
 */
export function watchFiles() {
    gulp.watch(paths.styles.src, gulp.series(watchStyles));
    gulp.watch(paths.markup.src, reload);
}

/**
 * Watch task
 */
const watch = gulp.series(
    clean,
    gulp.parallel(watchStyles, watchScripts),
    serve,
    watchFiles,
);

/**
 * Build task
 */
export const build = gulp.series(
    clean,
    gulp.parallel(buildStyles, buildScripts),
    buildVendorScripts,
);

/**
 * Build vendor task
 */
export const buildVendor = gulp.series(buildVendorScripts);

/**
 * Default task
 */
export default watch;
