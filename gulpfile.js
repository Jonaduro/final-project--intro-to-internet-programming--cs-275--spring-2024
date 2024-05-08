const { src, dest, series, watch } = require(`gulp`);
const CSSLinter = require(`gulp-stylelint`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const jsCompressor = require(`gulp-uglify`);
const jsLinter = require(`gulp-eslint`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let browserChoice = `default`;

function lintJS() {
    return src(`dev/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
}

function transpileJSForDev() {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/dev/js`));
}

function compressHTML() {
    return src(`dev/html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/dev/html`));
}

function transpileJSForProd() {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/dev/js`));
}

function copyHTML() {
    return src(`dev/html/*html`)
        .pipe(dest(`temp`));
}

function lintCSS() {
    return src(`dev/css/style.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
}

function copyUnprocessedAssetsForDev() {
    return src([
        `json*/*.json`,
        `dev/css*/*.css`,
        `dev/html/index.html`
    ], {dot: true})
        .pipe(dest(`temp`));
}

function serve() {
    browserSync({
        notify: true,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });

    watch(`dev/js/*.js`, series(lintJS, transpileJSForDev))
        .on(`change`, reload);

    watch(`dev/css/*.css`)
        .on(`change`, reload);
}

exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.compressHTML = compressHTML;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForDev = copyUnprocessedAssetsForDev;
exports.lintCSS = lintCSS;
exports.default = series(
    lintJS,
    lintCSS,
    transpileJSForDev,
    copyUnprocessedAssetsForDev,
    serve
);
exports.build = series(
    compressHTML,
    transpileJSForProd,
);
