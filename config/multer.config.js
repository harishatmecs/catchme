const multer = require('multer');
const path = require("path");

var memory = multer.memoryStorage();

var disk = multer.diskStorage({
	destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var memory = multer({dest: './uploads/', storage: memory, limits: { fieldSize: 25 * 1024 * 1024 }});

var disk = multer({dest: './uploads/', storage: disk, limits: { fieldSize: 25 * 1024 * 1024 }});

module.exports = {memory, disk};
