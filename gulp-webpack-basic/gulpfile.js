const { src, dest, parallel, series } = require('gulp');
const avifPlugin = require('gulp-avif');
const webpPlugin = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

const avif = () => {
    return src('src/assets/img/*.{png,jpg,jpeg}')
        .pipe(avifPlugin())
        .pipe(dest('src/assets/img/'));
};

const webp = () => {
    return src('src/assets/img/*.{png,jpg,jpeg}')
        .pipe(webpPlugin())
        .pipe(dest('src/assets/img/'));
};

const svg = () => {
    return src('src/assets/img/*.svg').pipe(dest('src/assets/img/'));
};

const imageminimize = () => {
    return src(['src/assets/img/*.*'])
        .pipe(imagemin())
        .pipe(dest('src/assets/img'));
};

const fonts = () => {
    return src('src/fonts/*.{ttf,otf}')
        .pipe(fonter({ formats: ['woff'] }))
        .pipe(dest('src/fonts'))
        .pipe(src('src/fonts/*.{ttf,otf}'))
        .pipe(ttf2woff2())
        .pipe(dest('src/fonts'));
};

exports.fonts = fonts;
exports.images = series(avif, webp, svg, imageminimize);
exports.default = parallel(fonts, images);
