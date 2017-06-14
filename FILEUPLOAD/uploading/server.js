// var express = require('express');
// //var routes = require('./index');
// var uploads = require('./uploads');
// var http = require('http');
// var path = require('path');
//
// var app = express();
//
// // all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.bodyParser());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);
//
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
//
// app.get('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })
// app.post('/uploads', uploads.uploads);
//
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
//
// app.get('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })



var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const pg = require('pg');
const path = require('path');
const connectionString = "postgres://postgres:specsy@localhost/demo";



// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'public/uploads/')
	},
	filename: function(req,file,cb){
		cb(null,file.originalname);
//Date.now() +
	}
});
// var upload = multer({ storage:storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(multer({ dest: '/public/uploads/'}));
//var upload = multer({ dest: './public/uploads'}).single();
var upload = multer({ storage:storage });
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

// app.post('/process_post', urlencodedParser, function (req, res) {
//
//
//    // Prepare output in JSON format
//    const response = {
//       uploaded_filename:req.body.first_name,
//       description:req.body.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
//
//    // To check database connection
//    pg.connect(connectionString, (err, client, done) => {
//      if(err){
//        done();
//        console.log(err);
//        return res.status(500).json({success:false, data:err});
//      }
//      client.query('INSERT INTO uploads(uploaded_filename, description) values ($1,$2)',
//    [response.uploaded_filename, response.description]);
//
//    console.log("Inserting data into table");
//   });
// })


app.post('/file_upload', urlencodedParser, upload.any(),function(req,res,next){
	//console.log(req.files)
  pg.connect(connectionString, (err, client, done) => {
    var count = 0;
    res.send(req.files);
    // console.log(req.files);
    var data = req.files;
    //{
    // if(err){
    //   done();
    //   console.log(err);
    //   return res.status(500).json({success:false, data:err});
    // }
     for(var i = 0; i < data.length; i++) {
        console.log("=========================================>" + (data[i])["originalname"] + "<======================================================");
        var filename = (data[i])["originalname"];
        client.query(
          'INSERT INTO uploads(uploaded_filename) values($1)',
          [filename],
          function(err,result) {
            if(err){
              console.log(err);
            } else{
              console.log("Inserted data into table");
            }
          count ++;
          console.log('\n ====================== COUNT =' +count);
          if(count == data.length){
            console.log(" ================================================================> End of Connection <======================================");
            client.end();
          }
        });
   }
 });
});


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})
