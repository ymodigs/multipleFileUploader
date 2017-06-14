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



router.post('/api/v1/1029',upload.any(),function(req,res,next){
	// console.log(req.files);
	// res.send(req.files.originalname+'\n');


	// const results = [];
	// const data = {text: req.body.text, }
});


/* POST iamges */
router.post('/', urlencodedParser, upload.any(),function(req,res,next){
	//console.log(req.files);
	res.send(req.files);
	console.log("HELLO"+'\n');

	response = {
		 image1:req.body.myimage1,
		 image2:req.body.myimage2,
		 image3: req.body.myimage3,
	};

	console.log(response);
	res.end(JSON.stringify(response));
});




module.exports = router;
