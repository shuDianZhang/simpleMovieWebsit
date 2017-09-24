/**
 * Created by 白色风车 on 2017/6/30.
 */
module.exports=function (grunt) {
    grunt.initConfig({
          watch:{
              jade:{
                  // 监听文件所在目录
                  files:['views/**'],
                  options:{
                      livereload:true
                  }
              },
              js:{
                  files:['public/js/**','modules/**/*.js','schemas/**/*.js'],
                  //tasks:['jshint'],
                  options:{
                      //文件改动重新启动服务
                      livereload:true
                  }
              }
          },
        nodemon:{
                dev: {
                    script: 'app.js',
                    options: {
                        args: [],
                        nodeArgs: ['--debug'],
                        ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                        ext: 'js',
                        watch: ['./'],
                        delay: 1000,
                        env: {
                            PORT: '3000'
                        },
                        cwd: __dirname
                    }
                }
        },
        concurrent:{
              //跑 watch 和 nodemon 任务
              tasks:['watch','nodemon'],
            options:{
                  logConcurrentOutput:true
            }
        }
    });

    // 只要有文件添加、修改、删除，就会去重新执行在里面注册好的任务
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 主要监听app.js文件，当发生改动的时候，重新启动app.js
    grunt.loadNpmTasks('grunt-nodemon');
    //针对慢任务开发的插件，例如sass，优化构建的时间
    grunt.loadNpmTasks('grunt-concurrent');
    //防止警告等异常中断所有grunt服务

    grunt.option('force',true);
    //注册一个default任务，传入一个数组中'concurrent'
    grunt.registerTask('default',['concurrent']);
}
