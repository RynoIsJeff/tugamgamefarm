"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");

var path = {
  src: {
    html: "source/*.html",
    sitemap: "source/sitemap.xml",
    robots: "source/robots.txt",
    others: "source/*.+(php|ico|png)",
    htminc: "source/partials/**/*.htm",
    incdir: "source/partials/",
    plugins: "source/plugins/**/*.*",
    js: "source/js/*.js",
    scss: "source/scss/**/*.scss",
    images: "source/images/**/*.+(png|jpg|gif|svg)",
  },
  build: {
    dirBuild: "theme/",
    dirDev: "theme/",
  },
};

// HTML
gulp.task("html:build", function () {
  return gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
      })
    )
    .pipe(gulp.dest(path.build.dirDev))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// SCSS — dev (expanded + sourcemaps)
gulp.task("scss:build", function () {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest(path.build.dirDev + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// SCSS — production (compressed, no sourcemaps)
gulp.task("scss:prod", function () {
  return gulp
    .src(path.src.scss)
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.dirBuild + "css/"));
});

// Javascript — dev (unminified)
gulp.task("js:build", function () {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.dirDev + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Javascript — production (minified)
gulp.task("js:prod", function () {
  return gulp
    .src(path.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.build.dirBuild + "js/"));
});

// Images
gulp.task("images:build", function () {
  return gulp
    .src(path.src.images)
    .pipe(gulp.dest(path.build.dirDev + "images/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Plugins
gulp.task("plugins:build", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dirDev + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Other files like favicon, php, sourcele-icon on root directory
gulp.task("others:build", function () {
  return gulp.src(path.src.others).pipe(gulp.dest(path.build.dirDev));
});

// Sitemap (copy to theme for SEO)
gulp.task("sitemap:build", function () {
  return gulp.src(path.src.sitemap).pipe(gulp.dest(path.build.dirDev));
});

// Robots.txt
gulp.task("robots:build", function () {
  return gulp.src(path.src.robots).pipe(gulp.dest(path.build.dirDev));
});

// Clean Build Folder
gulp.task("clean", function (cb) {
  rimraf("./theme", cb);
});

// Watch Task
gulp.task("watch:build", function () {
  gulp.watch(path.src.html, gulp.series("html:build"));
  gulp.watch(path.src.htminc, gulp.series("html:build"));
  gulp.watch(path.src.scss, gulp.series("scss:build"));
  gulp.watch(path.src.js, gulp.series("js:build"));
  gulp.watch(path.src.images, gulp.series("images:build"));
  gulp.watch(path.src.plugins, gulp.series("plugins:build"));
  gulp.watch(path.src.sitemap, gulp.series("sitemap:build"));
  gulp.watch(path.src.robots, gulp.series("robots:build"));
});

// Dev Task
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html:build",
    "js:build",
    "scss:build",
    "images:build",
    "plugins:build",
    "others:build",
    "sitemap:build",
    "robots:build",
    gulp.parallel("watch:build", function () {
      bs.init({
        server: {
          baseDir: path.build.dirDev,
        },
      });
    })
  )
);

// Production Build Task (minified CSS/JS, no sourcemaps)
gulp.task(
  "build",
  gulp.series(
    "html:build",
    "js:prod",
    "scss:prod",
    "images:build",
    "plugins:build",
    "others:build",
    "sitemap:build",
    "robots:build"
  )
);
