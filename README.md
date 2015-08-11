# WEB-TEMPLATE

Basic starter kit for web development.
No additional libraries added to simplify set up. Just add your favorite ones in the adequate folder.


## Setup

Get this project via:

* Clone this repository.
* Download ZIP.

1. Install [`io.js`](https://iojs.org/en/index.html) / [`Node.js`](https://nodejs.org/download/).
2. Install [`gulp.js`](http://gulpjs.com/) by running `npm install --global gulp` on the terminal.
3. Within your terminal navigate where the project is located.
3. Run `npm install` to install all the dependencies.

## Tasks built-in
* `replace`: Changes paths in the html for the buil version.
* `paths`: Automaically updates paths of index.html.
* `images`: Copies images into the build folder.
* `styles:dev`: Convert _.styl_ files into _.css_ and apply autoprefixer process to it.
* `styles:build`: Concat all styles and applies:
	* shorthand: makes your CSS files lighter and more readable.
	* csscomb: sorting CSS properties in specific order.
	* csso: minimize css.
* `scripts:build`: Concats all _.js_ files and compresses its result.
