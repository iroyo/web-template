# WEB-TEMPLATE

Basic starter kit for web development.
No additional libraries added to simplify set up. Just add your favorite ones in the adequate folder.

## Index

* [Project description](#description).
* [Tecnologies and languages used in this project](#tecnologies).
* [Basic setup: Intsalling Node, Gulp](#setup).
* [Gulp usage](#gulp-usage).
	* [While developing](#develop).
	* [For production](#production).
* [Folder structure](#directory-structure).
* [Task list Gulp](#tasks-built-in).

## Description


## Tecnologies


## Setup

Get this project via:

* Clone this repository.
* Download ZIP.

1. Install [`io.js`](https://iojs.org/en/index.html) / [`Node.js`](https://nodejs.org/download/).
2. Install [`gulp.js`](http://gulpjs.com/) by running `npm install --global gulp` on the terminal.
3. Within your terminal navigate where the project is located.
3. Run `npm install` to install all the dependencies.

## Gulp Usage

#### Develop
While developing just use `gulp watch`. This task will:

* Convert any _.styl_ into _.css_.
* Injects every _.css_ and _.js_ file path into the index.html.
* Automatically adds every photo in the distribution folder.

#### Production
When everything is ready to ship use `gulp build`. This task will:

* Concat all _.css_ files into one and perform [other tasks](#styles-b).
* Concat all _.js_ files into one and perform [other tasks](#scripts-b).
* Automatically update paths of the index.html.

## Directory structure

```
.
├── src
|   ├── stylus
|   ├── css
|   |    └── vendor
|   ├── js
|   |    └── vendor
|   └── images
├── node_module
└── index.html
```

## Tasks built-in
Next the description of every gulp task in this project:

* `replace`: Changes paths in the html for the buil version.
* `paths`: Automaically updates paths of index.html.
* `images`: Copies images into the build folder.
* `styles:dev`: Convert _.styl_ files into _.css_ and apply autoprefixer process to it.
* <a name="styles-b">`styles:build`</a>: Concat all styles and applies:
	* shorthand: makes your CSS files lighter and more readable.
	* csscomb: sorting CSS properties in specific order.
	* csso: minimize css.
* <a name="scripts-b">`scripts:build`</a>: Concats all _.js_ files and applies:
	* uglify: compresses code.
	* header: adds a header to the file.
