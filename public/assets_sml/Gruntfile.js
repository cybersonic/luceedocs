module.exports = function( grunt ) {

	grunt.loadNpmTasks( 'grunt-contrib-clean'  );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-less'   );
	grunt.loadNpmTasks( 'grunt-contrib-rename' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-rev' );

	grunt.registerTask( 'default', [ 'uglify', 'less', 'cssmin', 'clean:revs', 'rev', 'rename' ] );
	grunt.registerTask( 'full', [ 'uglify', 'less', 'cssmin', 'clean:full', 'rev', 'rename', 'copy' ] );

	grunt.initConfig( {
		uglify: {
			options:{
				  sourceMap     : true
				, sourceMapName : function( dest ){
					var parts = dest.split( "/" );
					parts[ parts.length-1 ] = parts[ parts.length-1 ].replace( /\.js$/, ".map" );
					return parts.join( "/" );
				 }
			},
			corejs:{
				expand  : true,
				cwd     : "js/",
				src     : ["core/*.js", "!**/_*.min.js" ],
				dest    : "js/",
				ext     : ".min.js",
				rename  : function( dest, src ){
					var pathSplit = src.split( '/' );

					pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-2 ] + ".min.js";

					return dest + pathSplit.join( "/" );
				}
			},
			specific:{
				files: [{
					expand  : true,
					cwd     : "js/specific/",
					src     : ["**/*.js", "!**/*.min.js" ],
					dest    : "js/specific/",
					ext     : ".min.js",
					rename  : function( dest, src ){
						var pathSplit = src.split( '/' );

						pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-2 ] + ".min.js";

						return dest + pathSplit.join( "/" );
					}
				}]
			}
		},

		less: {
			options: {
			},
			specific : {
				files: [{
					expand  : true,
					cwd     : 'css/',
					src     : ['specific/**/*.less'],
					dest    : 'css/',
					ext     : ".less.css",
					rename  : function( dest, src ){
						var pathSplit = src.split( '/' );

						pathSplit[ pathSplit.length-1 ] = pathSplit[ pathSplit.length-1 ];

						return dest + pathSplit.join( "/" );
					}
				}]
			},
			core : {
				src : "css/core/core.less",
				dest : "css/core/core.less.css"
			}
		},

		cssmin: {
			specific: {
				expand : true,
				cwd    : 'css/',
				src    : [ 'specific/**/*.css', '!**/_*.min.css' ],
				ext    : '.min.css',
				dest   : 'css/',
				rename : function( dest, src ){
					var pathSplit = src.split( '/' );

					pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-2 ] + ".min.css";
					return dest + pathSplit.join( "/" );
				}
			},
			core : {
				src  : "css/core/core.less.css",
				dest : "css/core/_core.min.css"
			}
		},

		rev: {
			options: {
				algorithm : 'md5',
				length    : 8
			},
			assets: {
				src : "**/_*.min.{js,css}"
			}
		},

		rename: {
			assets: {
				expand : true,
				cwd    : '',
				src    : '**/*._*.min.{js,css}',
				dest   : '',
				rename : function( dest, src ){
					var pathSplit = src.split( '/' );

					pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-1 ].replace( /\._/, "." );

					return dest + pathSplit.join( "/" );
				}
			}
		},

		clean: {
			revs : {
				  src    : ['../../static/assets/**/_*.min.{js,css}']
				, filter : function( src ){ return src.match(/[\/\\]_[a-f0-9]{8}\./) !== null; }
			},
			full : {
				  src    : ['**/_*.min.{js,css}','../../website/assets/**/_*.min.{js,css}']
				, filter : function( src ){ return src.match(/[\/\\]_[a-f0-9]{8}\./) !== null; }
			}
		},

		copy: {
		  main: {
		    files: [
		      { expand: true, src: ['css/lib/*' ], dest: '../../website/assets' },
		      { expand: true, src: ['css/core/*.min.css' ], dest: '../../website/assets' },
		      { expand: true, src: [ 'css/specific/**/*.min.css' ], dest: '../../website/assets' },

		      { expand: true, src: ['js/**/*'], dest: '../../website/assets', filter: 'isFile' },
		      { expand: true, src: ['img/**/*'], dest: '../../website/assets', filter: 'isFile' },
		      { src: ['StickerBundle.cfc'], dest: '../../website/assets/StickerBundle.cfc' }
		    ]
		  }
		},

		watch: {
		    scripts: {
		        files : [ "css/**/*.less", "js/**/*.js", "!js/**/*.min.js" ],
		        tasks : [ "default" ]
		    }
		}

	} );
};