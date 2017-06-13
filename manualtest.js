const express = require('express');
const fileUpload = require('./lib/index.js');
const app = express();

app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

/*
 app.all('/upload/array', function(req, res) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');

    let testFiles = req.files.testFiles;

    if (!testFiles)
      return res.status(400).send('No files were uploaded');

    if (!Array.isArray(testFiles))
      return res.status(400).send('Files were not uploaded as an array');

    if (!testFiles.length)
      return res.status(400).send('Files array is empty');

    let filesUploaded = 0;
    for (let i = 0; i < testFiles.length; i++) {
      let uploadPath = path.join(uploadDir, testFiles[i].name);

      testFiles[i].mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);

        if (++filesUploaded === testFiles.length)
          res.send('File uploaded to ' + uploadPath);
      });
    }
  });*/

app.post('/upload', function(req, res) {
  // Uploaded files: 
  // console.log(req.files.my_profile_pic.name);
  // console.log(req.files.my_pet.name);
  // console.log(req.files.my_cover_photo.name);

  let sampleFile;
  let uploadPath;

  if (!req.files) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files);

  sampleFile = req.files.sampleFile;
  console.log("hELLO "+sampleFile.length);
  /*let filesUploaded = 0;
  for (let i=0; i< sampleFile.length; i++){
    uploadPath = path.join(uploadDir, sampleFile[i].name);

    sampleFile[i].mv(uploadPath, function(err) {
      if(err)
        return res.status(500).send(err);

      if(++filesUploaded == sampleFile.length)
          res.send('File uploaded to ' + uploadPath);
        });
    }*/
  });


  /*uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded to ' + uploadPath);
  });
});*/

app.listen(8000, function() {
  console.log('Express server listening on port 8000');
});
