var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const db = require('./config/keys.js').mongoURI;
const mongoose = require('mongoose');
require('dotenv').config()
var users = require('./controllers/users.controllers');
var profile = require('./controllers/profile.controllers');

var app = express();

mongoose.connect(db)
.then(()=>console.log('connection avec success to node'))
.catch((err)=>console.log(err))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);



const multer = require('multer');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}


const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})


// POST File
app.post('/api/upload', upload.single('image'), (req, res) => {

   if (req.file.location){
    return res.status(200).json({message:"Image Uploaded With Success"});
   }
  
   res.send(req.file.location)

});



module.exports = app;
