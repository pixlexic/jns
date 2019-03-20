
const _pdf = require('pdf-thumbnail');
var _fs = require('fs');
var _path = require('path');
var _gm = require('gm').subClass({imageMagick: true});

var pdfService = {};



pdfService.test = function(i) {

    //const pdfBuffer = require('fs').readFileSync('/public/pdf/preview.pdf');



    if (_fs.existsSync('./public/data/pdf/xpreview.pdf')) {
        console.log('true');
       

        _gm("./public/data/pdf/xpreview.pdf")
        .thumb(
            250, // Width
            325, // Height
            './public/data/pdf/thumbnail.png', // Output file name
            80, // Quality from 0 to 100
            function (error, stdout, stderr, command) {
                if (!error) {
                    console.log(command);
                } else {
                    console.log(error);
                }
            }
        );
    }
/*
    _pdf(_fs.readFileSync("./public/data/pdf/preview.pdf"), {
        compress: {
          type:"JPEG",
          quality: 70
        }
      })
      .then(data => console.log(data))
        .then(data  => data.pipe(_fs.createWriteStream( _path.join('', "./public/data/pdf/previewBuffer.jpg"))))
        .catch(err => console.error(err))
     
      // //with stream
      _pdf(_fs.createReadStream(_path.join('', "./public/data/pdf/xpreview.pdf")), {
        compress: {
          type:"JPEG",
          quality: 70
        }
      })
        .then(data  => data.pipe(_fs.createWriteStream(_path.join('', "./public/data/pdf/previewStream.jpg"))))
        .catch(err => console.error(err))

  */     






};










module.exports = pdfService;