//откуда, куда, сторож, одновременные процессы, последовательное выполнение
const { src, dest, watch, parallel, series } = require('gulp');             //возможности gulp

//подключаем модули для работы конвертации
const sass = require('gulp-sass')(require('sass'));       //для конвертации из scss в css
const concat = require('gulp-concat');                    //для объединения файлов или переименования
const uglify = require('gulp-uglify-es').default;         //для сжатия js файлов
const browserSync = require('browser-sync').create();     //для автоматического обновления страницы
const autoprefixer = require('gulp-autoprefixer');        //для автопрефиксов css-стилей
const clean = require('gulp-clean');                      //для очистки перед билдом
const avif = require('gulp-avif');                        //для конвертации в avif
const webp = require('gulp-webp');                        //для конвертации в webp
const imagemin = require('gulp-imagemin');                //для конвертации в jpg/png
const newer = require('gulp-newer');                      //для конвертации только новых файлов
const fonter = require('gulp-fonter');                    //для конвертации шрифтов в woff(или другие)
const ttf2woff2 = require('gulp-ttf2woff2');              //для конвертации любых шрифтов в woff2


function styles() {
    return src('app/css/style.scss')                      //Какой файл конвертируем
        .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))                    //как будет называться файл
        .pipe(sass({ outputStyle: 'compressed' }))        //тут уже поработала SASS константа + минифицируем
        .pipe(dest('app/css'))                            //куда выкинуть обработанный файл
        .pipe(browserSync.stream());                      //Обновляем страницу
}

function scripts() {
    return src('app/js/index.js')
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"                                //директория для слежения
        }
    });
    watch(['app/css/*.scss'], styles)                  //Когда в папке произойдут изменения сработает функция
    watch(['app/js/index.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
    watch(['app/assets/images'], images)
}

function cleanDist() {
    return src('dist')
        .pipe(clean());
}

function images(){
    return src(['app/assets/images/*.*', '!app/assets/images/*.svg'])          //конвертируем все картинки кроме svg формата
    .pipe(newer('app/assets/dist'))                                            //Для обхода дубликатов(кэш картинок)
    .pipe(avif({quality: 50}))

    .pipe(src(['app/assets/images/*.*']))
    .pipe(newer('app/assets/dist'))
    .pipe(webp())

    .pipe(src(['app/assets/images/*.*']))
    .pipe(newer('app/assets/dist'))
    .pipe(imagemin())

    .pipe(dest('app/assets/dist'))
}

function fonts(){
    return src('app/fonts/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function building() {                                       //что будем переносить в чистовик из черновика
    return src([
        'app/css/style.min.css',                            
        'app/js/index.min.js',
        'app/assets/dist/*.*',                      
        'app/fonts/*.*',  
        'app/**/*.html'],{ base: 'app' })                   //сохранить структуру проекта
        .pipe(dest('dist'))
}

//Для запуска функций
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.fonts = fonts;

//Порядок запуска
exports.build = series(cleanDist, building);                               //билд проекта
exports.default = parallel(styles, scripts,  watching);