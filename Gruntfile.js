module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json','bower.json'],
        commitFiles: ['package.json','bower.json'],
        pushTo: 'origin'
      }
    },
    cssmin: {
      target: {
        // options: {
        //     banner: '/* Mofified by Jin */'
        // },
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: ['**/*.js', '!**/*.min.js'],
            dest: 'dist/js',
            rename: function (dst, src) {
              // To keep the source js files and make new files as `*.min.js`:
              return dst + '/' + src.replace('.js', '.min.js');
              // Or to override to src:
              // return src;
            }
          },
          {
            'dist/js/jquery.emojipicker.all.min.js': ['src/js/jquery.emojipicker.js', 'src/js/jquery.emojis.js']
          }
        ]
      }
    },
    copy: {
      target: {
        files: [{
          // includes files within path and its sub-directories
          expand: true,
          cwd: 'static/',
          src: '**',
          dest: 'dist/'
        }]
      }
    },
    clean: ['dist/**']
  });

  // grunt.loadNpmTasks('grunt-bump');
  // Default task.  
  grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'copy']);
};
