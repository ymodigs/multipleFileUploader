var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');


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
var upload = multer({ storage:storage });
const pg = require('pg');
const path = require('path');
const connectionString = "postgres://postgres:specsy@localhost/demo"
/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
});



router.post('/api/v1/1029',  urlencodedParser, upload.any(),function(req,res,next){

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


/* POST iamges */
// router.post('/', urlencodedParser, upload.any(),function(req,res,next){
// 	//console.log(req.files);
// 	res.send(req.files);
// 	console.log("HELLO"+'\n');
//
// 	response = {
// 		 image1:req.body.myimage1,
// 		 image2:req.body.myimage2,
// 		 image3: req.body.myimage3,
// 	};
//
// 	console.log(response);
// 	res.end(JSON.stringify(response));
// });




module.exports = router;
