var express = require('express');
var application = express();
var bodyParser =require('body-parser');
var multer  = require('multer');


var urlForm = bodyParser.urlencoded({extended: false});
var urlJson = bodyParser.json();
var fs = require('fs');


application.use(urlForm);
application.use(multer({ dest: '/tmp/'}).array('image'));

//子进程调用终端x`
var child_process = require('child_process');

application.use('/img', express.static('image'))

// var worker0 = child_process.spawnSync('g++', ['publish_copy.cpp', '-o', 'publish_copy']);
// var worker1 = child_process.spawn('./publish_copy');

// worker1.stdout.on('data', function(data){
//    console.log('stdout: ' + data);
// });

// worker1.stderr.on('data', function (data) {
//    console.log('stderr: ' + data);
// });


application.get('/ff', function(req, res){
   fs.writeFile('input.txt', 'forward',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });

   res.send("ff");
})

application.get('/cc', function(req, res){
   fs.writeFile('input.txt', '$',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("cc");

})

application.get('/ss', function(req, res){
   fs.writeFile('input.txt', 'stop',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("ss");

})

application.get('/publish', function(req, res){

   
   //worker1.stdin.write("f");
   var sendWorker = child_process.spawn('echo', ['f']);
   
   sendWorker.stdout.pipe(worker1.stdin);
   
   
   var closeWorker = child_process.spawn('echo', ['c']);
   closeWorker.stdout.pipe(worker1.stdin);
   closeWorker.on('close', function (code) {
      console.log('close进程已退出，退出码 '+code);
   });
   //closeWorker.stdout.pipe(worker1.stdin);

   sendWorker.stdout.on('data', function(data){
      console.log('sendWorker-stdout: ' + data);
   });
   sendWorker.on('close', function (code) {
      console.log('send进程已退出，退出码 '+code);
   });

   
   console.log("***********************8")
   
    //  worker.on('close', function (code) {
    //     console.log('子进程已退出，退出码 '+code);
    //  });
   //  var worker = child_process.spawnSync('g++', ['test.cpp', '-o', 'test']);
   //  console.log(worker.stdout.toString());
   //  console.log(worker.stderr.toString());

   //  var worker = child_process.spawnSync('./test');
   //  console.log(worker.stdout.toString());
   //  console.log(worker.stderr.toString());


    res.send("has publish");

})


application.get('/stop', urlForm, function (req, res) {
   fs.writeFile('input.txt', 'stop',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("stop");


    
   // var worker = child_process.spawn('rosrun', ['my_demo', 'web6_publish', 'stop']);

   // worker.stdout.on('data', function (data) {
   //     console.log('stdout: ' + data);
   //  });
  
   //  worker.stderr.on('error', function (error) {
   //    console.log('stderr: ' + error);
   // });
  
   //  worker.on('close', function (code) {
   //     console.log('子进程已退出，退出码 '+code);
   //  });
   // res.send('forward command done');

})



//rosrun my_demo web6_publish forward 

application.get('/forward', urlForm, function (req, res) {
   fs.writeFile('input.txt', 'forward',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("forward");
    
   // var worker = child_process.spawn('rosrun', ['my_demo', 'web6_publish', 'forward']);

   // worker.stdout.on('data', function (data) {
   //     console.log('stdout: ' + data);
   //  });
  
   //  worker.on('error', function (error) {
   //    console.log('stderr: ' + error);
   // });
  
   //  worker.on('close', function (code) {
   //     console.log('子进程已退出，退出码 '+code);
   //  });
   // res.send('forward command done');

})



application.get('/back', urlForm, function (req, res) {
   fs.writeFile('input.txt', 'backward',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("backward");
  
   //  var worker = child_process.spawn('rosrun', ['my_demo', 'web6_publish', 'backward']);

   //  worker.stdout.on('data', function (data) {
   //      console.log('stdout: ' + data);
   //   });
   
   //   worker.on('error', function (error) {
   //    console.log('stderr: ' + error);
   // });
   
   //   worker.on('close', function (code) {
   //      console.log('子进程已退出，退出码 '+code);
   //   });
   //  res.send('backward command done');

})

application.get('/left', urlForm, function (req, res) {
   fs.writeFile('input.txt', 'left',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("left");

    

   //  var worker = child_process.spawn('rosrun', ['my_demo', 'web6_publish', 'left']);

   //  worker.stdout.on('data', function (data) {
   //      console.log('stdout: ' + data);
   //   });
   
   //   worker.on('error', function (error) {
   //    console.log('stderr: ' + error);
   // });
   
   //   worker.on('close', function (code) {
   //      console.log('子进程已退出，退出码 '+code);
   //   });
   //  res.send('turn left command done');

})

application.get('/right', urlForm, function (req, res) {
   fs.writeFile('input.txt', 'right',  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
   res.send("right");

   //  var worker = child_process.spawn('rosrun', ['my_demo', 'web6_publish', 'right']);

   //  worker.stdout.on('data', function (data) {
   //      console.log('stdout: ' + data);
   //   });
   
   //   worker.on('error', function (error) {
   //    console.log('stderr: ' + error);
   // });
   
   //   worker.on('close', function (code) {
   //      console.log('子进程已退出，退出码 '+code);
   //   });
   //  res.send('turn right command done');

})

application.post('/waypoint', urlJson, function(req, res){
   var datas = JSON.parse(JSON.stringify(req.body));
   var waypoint_name;
   for (data in datas){
      var js = JSON.parse(data);
      waypoint_name = js.waypoint_name;
   }
   console.log("waypoing_name:"+waypoint_name);
   res.send("point done");
   fs.writeFile('input.txt', "addPoint_" + waypoint_name,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
})

//goto_waypoint_name
application.post('/navi', urlJson, function(req, res){
   var datas = JSON.parse(JSON.stringify(req.body));
   var navi_name;
   for (data in datas){
      var js = JSON.parse(data);
      navi_name = js.navi_name;
   }
   console.log("navi_name:"+navi_name);
   res.send("navi done");
   fs.writeFile('input.txt', "goto_" + navi_name,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
})


application.post('/grab', urlJson, function(req, res){
   var datas = JSON.parse(JSON.stringify(req.body));
   var grab_name;
   for (data in datas){
      var js = JSON.parse(data);
      grab_name = js.grab_name;
   }
   console.log("grab_name:"+grab_name);
   res.send("grab done");
   fs.writeFile('input.txt', "grab_" + grab_name,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
})

//-1:是。 -2：否
application.post('/loadMap', urlJson, function(req, res){
   console.log(req.body);
   var datas = JSON.parse(JSON.stringify(req.body));
   var load_map;
   for (data in datas){
      var js = JSON.parse(data);
      load_map = js.load_map;
   }
   console.log("map_name:"+load_map);
   res.send("grab done");
   var res = "notLoad";
   if (load_map == -1)  res = "loadMap"; 
   fs.writeFile('input.txt', res,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
})

application.get('/saveMap', urlForm, function(req, res){
   console.log("saveMap");
   fs.writeFile('input.txt', "savePoint",  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });

})

application.get('/resetMap', urlForm, function(req, res){
   console.log("resetMap");
   fs.writeFile('input.txt', res,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("数据写入成功！");
      console.log("--------我是分割线-------------")
      console.log("读取写入的数据！");
      fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
      });
   });
})


application.get('/test', urlForm, function(req, res){


    var worker = child_process.spawn('echo', ['test again']);

    worker.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
     });
   
     worker.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
     });
   
     worker.on('close', function (code) {
        console.log('子进程已退出，退出码 '+code);
     });

    // var worker = child_process.exec('ls', function (error, stdout, stderr) {
    //     if (error) {
    //         console.log(error.stack);
    //         console.log('Error code: '+error.code);
    //         console.log('Signal received: '+error.signal);
    //     }
    //     console.log('stdout: ' + stdout);
    //     console.log('stderr: ' + stderr);
    // });
    // worker.on('exit', function (code) {
    //     console.log('推出进程' + code);
    // })
    // //console.log(res);
    // var date = new Date();
    // console.log(date);
    res.send('yeah, I have receive.done.');
})



application.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/html/" + "index.html" );
 })
  
 application.post('/file_upload', function (req, res) {
  
    console.log(req.files[0]);  // 上传的文件信息
  
    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })


var server = application.listen(60130, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("请访问%s:%s", host, port);
})











