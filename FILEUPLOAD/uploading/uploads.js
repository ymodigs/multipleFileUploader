var fs = require("fs");

exports.uploads = function(req, res){
  //console.log(req.files);
  fs.readFile(req.files.image.path, function (err, data) {

    console.log("Request handler upload was called");
    var imageName = req.files.image.name;
    console.log(imageName);

    if(!imageName){

        console.log("There was an error")
        res.redirect("/");
        res.end();

    } else {

      var newPath = __dirname + "/uploads/" + imageName;


      fs.writeFile(newPath, data, function (err) {


        res.redirect("/uploads/" + imageName);

      });
    }
});
}