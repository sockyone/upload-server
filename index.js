var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var path = require('path')
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files');
  },
  filename: function (req, file, callback) {
    console.log(file.originalname)
    callback(null, req.headers.filename || "default");
  }
});

var bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var upload = multer({ storage : storage }).single('file');

app.post('/upload',function(req,res) {
    console.log(req.headers.filename)
    upload(req, res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("OK");
    });
});

app.get('/file/:filename', function(req, res) {
    res.sendFile(path.resolve("files", req.params.filename))
})

app.listen(3121,function(){
    console.log("Working on port 3121");
});