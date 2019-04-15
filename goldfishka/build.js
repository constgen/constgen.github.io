//tested on Node 0.10.3
'use strict';

var //fs = require("fs"),
	fs = require('./node-builder/node-fs-extra-mod'), //https://github.com/jprichardson/node-fs-extra
    sys = require("sys"),
	path = require('path'),
	Core = require('./core/Core.js'),
	csso = require('./node-builder/csso/cssoapi.js'), //http://ru.bem.info/tools/csso/usage/
	uglify = require('./node-builder/uglify-js/uglify-js.js').uglify, //https://github.com/mishoo/UglifyJS
	parser = require('./node-builder/uglify-js/uglify-js.js').parser;
//var util = require("util")




var Config,
	Build,
	FS = {} //new file system API;

//gets an Array and returns new Array with unique values
function uniqueArray (Arr) {
	var Unique = [];
	Arr.forEach(function(itm){
		if ( ! Unique.some(function(uniqueitm){
			return uniqueitm === itm
		})) {
			Unique.push(itm)
		}
	})
	return Unique;
}


//https://github.com/joyent/node/blob/master/lib/module.js#L453
function stripBOM(content) {
	// Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	// because the buffer-to-string conversion in `fs.readFileSync()`
	// translates it to FEFF, the UTF-16 BOM.
	if (content.charCodeAt(0) === 0xFEFF) {
		content = content.slice(1);
	}
	return content;
}
//alternative
// Remove potential Unicode Byte Order Mark.
// buffer = buffer.replace(/^\uFEFF/, ''); 


function relocateCSS(options) {
	return Core.Util.relocateCss(options.oldPath, options.newPath, options.cssText)
}


function errorHandler(err) {
	throw err
}

FS.ReadFile = function (path) {
	return new Core.Promise(function (success, error) {
		fs.readFile(path, 'utf8', function (err, data) {
			//error handler
			if (err) {
				error(err)
				return;
			}

			//success handler
			success(stripBOM(data))
		})

	})
}

FS.AppendFile = function (filenameTo, data) {
	return new Core.Promise(function (success, error) {
		fs.appendFile(filenameTo, data, 'utf8', function (err) {
			//error handler
			if (err) {
				error(err)
				return;
			}
			//success handler
			success()
		})
	})
}

//gets content from one file and append it to another
FS.AppendFileTo = function (filenameFrom, filenameTo) {
	return FS.ReadFile(filenameFrom).then(
		function done(data) {
			if (/\.css$/.test(filenameFrom)) {
				//remove not necessary text, that may cause errors
				data = data.replace(/\@charset ".+";/g, '')
				//relocate url paths

				//move '@include', '@font-face' to the begginig of document
			}
			else if (/\.js$/.test(filenameFrom)) {
				//make shure that javascript code is valid
				data += ';'
			}

			return FS.AppendFile(filenameTo, data).then(
				function done() {
					console.log('APPENDED ' + filenameFrom + ' TO ' + filenameTo);
				},
				function error(err) {
					throw err
				}
			)
		},
		function error(err) {
			throw err
		}
	)
}

FS.AppendFileToCSS = function (filenameFrom) {
	return FS.ReadFile(filenameFrom).then(
		function done(data) {
			var oldPath,
				filenameTo = Config.out + '/css/styles.css';

			oldPath = filenameFrom.split('/')
			oldPath.pop()
			oldPath = oldPath.join('/')

			//remove not necessary text, that may cause errors
			data = data.replace(/\@charset ".+";/g, '')
			//relocate url paths

			//move '@include', '@font-face' to the begginig of document
			//TO BE DONE

			//change relative urls in css text according to new file location
			data = relocateCSS({
				oldPath: oldPath,
				newPath: 'css',
				cssText: data
			})

			return FS.AppendFile(filenameTo, data).then(
				function done() {
					console.log('APPENDED ' + filenameFrom + ' TO ' + filenameTo);
				},
				function error(err) {
					throw err
				}
			)
		},
		function error(err) {
			throw err
		}
	)
}

FS.MkDir = function (path) {
	return new Core.Promise(function (success, error) {
		fs.mkdir(path, null, function (err) {
			//error handler
			if (err && err.code !== 'EEXIST') {
				error(err)
				return;
			}
			//success handler
			success(path)
		})
	})
}

FS.WriteFile = function (path, data) {
	return new Core.Promise(function (success, error) {
		fs.writeFile(path, data, function (err) {
			//error handler
			if (err) {
				error(err)
				return;
			}
			//success handler
			success(data)
		})
	})
}

FS.ReadDir = function (path) {
	return new Core.Promise(function (success, error) {
		fs.readdir(path, function (err, Files) {
			//error handler
			if (err) {
				error(err)
				return;
			}
			//success handler
			success(Files)
		})
	})
}



//FS.ReadFile('./modules/requestProposal/style.css').then(function (data) {
//	console.log(
//		relocateCSS({
//			oldPath: 'modules/requestProposal',
//			newPath: 'modules',
//			cssText: data
//		})
//	)
//	
//})



//Get builder configurations
Build = FS.ReadFile('./build.json').then(null, function (err) { throw err })

Build.then(function done (data) {
	Config = JSON.parse(data.replace(/^.+?{/, '{'))
	console.log('Get config SUCCESSFULL')

	//copy some files as they are
	Config.copy.forEach(function (filepath) {
		fs.copy(Config.src + '/' + filepath.name, Config.out + '/' + (filepath.newname || filepath.name), function (err) {
			if (err) throw err;
			console.log('COPIED ' + filepath.name + ' TO ' + Config.out + '/' + (filepath.newname || filepath.name))
		})
	})


	//copy modules folders
	fs.copy(Config.src + '/modules' , Config.out + '/modules', function (err) {
		if (err) throw err;
		console.log('COPIED modules TO ' + Config.out + '/modules')
	})

	//redefine some Core configs
	Core.config.baseUrl = Config.baseUrl || ('file:///' + __dirname.replace(new RegExp('\\' + path.sep, 'g'), '/'))


	return Config
})





/*Create project structure and files in 'build' folder*/

Build.then(function () {
	return FS.MkDir(Config.out).then(function () {
		console.log('CREATED ' + Config.out + '/')
	})
})

Build.then(function () {
	return FS.MkDir(Config.out + '/css').then(function () {
		console.log('CREATED ' + Config.out + '/css/')
	})
})

Build.then(function () {
	return FS.WriteFile(Config.out + '/css/styles.css', '@charset "utf-8";').then(function () {
		console.log('CREATED ' + Config.out + '/css/styles.css')
	})
})

Build.then(function () {
	return FS.MkDir(Config.out + '/js').then(function () {
		console.log('CREATED ' + Config.out + '/js/')
	})
})

Build.then(function () {
	return FS.WriteFile(Config.out + '/js/modules.js', '').then(function () {
		console.log('CREATED ' + Config.out + '/js/modules.js')
	})
})




/*Parse modules*/
Build.then(function () {
	return FS.ReadDir('./').then(function (Files) {
		var ModulesPaths = [], //collection of paths to modules fo;ders
			HtmlFiles = [],//collection of host HTML files
			ModulesHtmlFiles = [], //collection of modules HTML files
			CSSCollection = [],
			JSCollection = [],
			ModulesBuild = Core.Promise();

		HtmlFiles = Files.filter(function (filename) {
			return /\.html$/.test(filename)
		})


		/*Read host html files and inject modules html to them*/
		ModulesBuild.then(function () {
			return Core.every(HtmlFiles.map(function (filename) {
				return FS.ReadFile(filename).then(function (data) {
					var modules = [],
						script = '',
						expr = '',
						exprtemp = '',
						html = '',
						url,
						AppendStyles = Core.Promise();

					//remove empty call of 'include'
					data = data.replace(/Core\.include\(('|")?('|")?\)/g, '')


					//Replace 'Core.include' with module html
					while (/<script.*?>.*Core\.include\(.+\)<\/script>/.test(data)) {
						// Regexp for parsing media rules
						script = /<script.*?>.*Core\.include\(.+\).*?<\/script>/.exec(data)[0]
						expr = script

						html = '' //reset html string
						while (/Core\.include/.test(expr)) {
							exprtemp = /Core\.include\(('|").+?('|")\)/.exec(expr)[0]
							url = exprtemp.replace(/^Core\.include\(('|")/, '').replace(/('|")\)$/, '')/*stripped path*/
							
							//augment `ModulesPaths`
							ModulesPaths.push(url)

							//use Core template function to replace {var} expressions with data
							html += Core.template(stripBOM(fs.readFileSync(url + '/index.html', 'utf8')), { url: url })

							//html += fs.readFileSync(url + '/index.html', 'utf8')
							expr = expr.replace(exprtemp, '')
						}


						// remove <script> tags and insert HTML from included modules
						data = data.replace(script, html)
					}


					//append css styles to general css file
					while (/<link\s+.*href=('|")??.+?\.css('|")??.*?>/.test(data)) {
						expr = /<link\s+.*href=('|")*?.+?\.css('|")*.*?>/.exec(data)[0]

						url = expr.replace(/^<link\s+.*href=('|")?/, '').replace(/.css('|")?.+>$/, '.css')/*stripped path*/

						//console.log(expr)
						//console.log(url)

						//prevent double including same files
						if (CSSCollection.indexOf(url) === -1) {
							CSSCollection.push(url)
							//join to css file
							AppendStyles.and(FS.AppendFileToCSS(url))
						}
						// remove <link> tag
						data = data.replace(expr, '')
					}
					//insert general css file
					data = data.replace('<\/head>', '<link rel="stylesheet" href="css/styles.css" type="text/css" \/><\/head>')

					//insert joined modules javascript
					data = data.replace('<\/body>', '<script src="js/modules.js"><\/script><\/body>')

					//create builded html files
					fs.writeFileSync(Config.out + '/' + filename, data)

					return AppendStyles;
				})

			})).then(null, errorHandler)
		})
		

		//colllect modules HTML files
		/*ModulesBuild.then(function () {
			return Core.every(HtmlFiles.map(function (filename) {
				return FS.ReadFile(filename).then(function (data) {
					var str = '';

					//clean comments first
					data = data.replace(/<!--(.|\n|\r)*?-->/g, '')

					//remove empty call of 'include'
					data = data.replace(/Core\.include\(('|")?('|")?\)/g, '')

					//Collect 'Core.include' expressions
					while (/Core\.include\(.+\)/.test(data)) {
						// Regexp for parsing media rules
						str = /Core\.include\(('|").+?('|")\)/.exec(data)[0]


						//ModulesPaths.push(str)


						// remove matched media rule from style
						data = data.replace(str, '')
					}
				})
			})).then(null, errorHandler)
		})*/
	
		/*define `ModulesPaths`, modules that are inserted into another modules are also taken into account*/
		/*ModulesBuild.then(function () {
			return Core.every(HtmlFiles.concat(ModulesHtmlFiles).map(function (filename) {
				return FS.ReadFile(filename).then(function (data) {
					var str = '';

					//clean comments first
					data = data.replace(/<!--(.|\n|\r)*?-->/g, '')

					//remove empty call of 'include'
					data = data.replace(/Core\.include\(('|")?('|")?\)/g, '')

					//Collect 'Core.include' expressions
					while (/Core\.include\(.+\)/.test(data)) {
						// Regexp for parsing media rules
						str = /Core\.include\(('|").+?('|")\)/.exec(data)[0]
						ModulesPaths.push(str)
						// remove matched media rule from style
						data = data.replace(str, '')
					}
				})
			})).then(null, errorHandler)
		})*/


		/*Join modules CSS and JS*/
		ModulesBuild.then(function () {
			var JoinCode = Core.Promise();

			console.log(ModulesPaths)

			//strip paths and filter reapeted values
			ModulesPaths = uniqueArray(ModulesPaths.map(function (expr) {
				return expr//.replace(/^Core\.include\(('|")/, '').replace(/('|")\)$/, '')
			}))

			//append modules CSS styles to general CSS file
			ModulesPaths.forEach(function (filenameFrom) {
				JoinCode.and(FS.AppendFileToCSS(filenameFrom.replace(/\/+$/, '')/*remove last slash*/ + '/style.css'))
			})

			//append modules JS to general JS file
			ModulesPaths.forEach(function (filenameFrom) {
				JoinCode.and(FS.AppendFileTo(filenameFrom.replace(/\/+$/, '')/*remove last slash*/ + '/register.js', Config.out + '/js/modules.js'))
			})

			return JoinCode;
		})



		return ModulesBuild; //return Promise
	})
})


/*Find font-face expressions and copy fonts files to build*/
//Build.then(function () {
//	FS.ReadFile(Config.out + '/css/styles.css').then(function (cssText) {
//		var fontFaceExpression;


//		console.log(1111111111, /@font-face(.|\n|\r)*?\{(.|\n|\r)+?\}/.test(cssText))

//		console.log(/@font-face(.|\n|\r)*?\{(.|\n|\r)*?url\(.+?\)(.|\n|\r)*?\}/.exec(cssText)[0])

//		return; 
//		//Parse '@font-face' expressions
//		while (/@font-face{.?url(.+?).??}/.test(cssText)) {
//			console.log(1111111111111)

//			// Regexp for parsing media rules
//			fontFaceExpression = /@font-face{.?url(.+?).??}/.exec(data)[0]

//			console.log(fontFaceExpression)

//			// remove matched media rule from style
//			cssText = cssText.replace(fontFaceExpression, '')


//		}

//	})
//})


/*Minimize and optimize code*/
Build.then(function () {
	var Xmize = Core.Promise()

	//work with modules JavaScript
	if (Config.minifyJs || Config.optimizeJs) {
		Xmize.and(FS.ReadFile(Config.out + '/js/modules.js').then(function (data) {
			var ast = parser.parse(data); // parse code and get the initial AST
			if (Config.minifyJs) {
				ast = uglify.ast_mangle(ast) // get a new AST with mangled names
			}
			if (Config.optimizeJs) {
				ast = uglify.ast_squeeze(ast) // get an AST with compression optimizations
			}
			
			data = uglify.gen_code(ast) // compressed code here
			return FS.WriteFile(Config.out + '/js/modules.js', data);
		}))
	}

	//work with css
	if (Config.minifyCss) {
		Xmize.and(FS.ReadFile(Config.out + '/css/styles.css').then(function (data) {
			data = csso.justDoIt(data, !Config.optimizeCss /*true - disable structure minification*/)
			return FS.WriteFile(Config.out + '/css/styles.css', data);
		}))
	}


	return Xmize;
})





