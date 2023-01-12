const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

function fileFilter(req, file, cb) {
  var fileType = `${file.mimetype}`.split('/')
  fileType = fileType[0]
  if (fileType == 'image') {
    return cb(null, true)
  } else {
    return cb(new Error('File is not Image'))
  }
}
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontEnd/instaui/public/uploads/userUploads')
  },
  filename: function (req, file, cb) {
    var fn = `${Date.now()}-${crypto
      .randomBytes(25)
      .toString('hex')}${path.extname(file.originalname)}`
    cb(null, fn)
  },
})
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontEnd/instaui/public/uploads/postUploads')
  },
  filename: function (req, file, cb) {
    var fn = `${Date.now()}-${crypto
      .randomBytes(25)
      .toString('hex')}${path.extname(file.originalname)}`
    cb(null, fn)
  },
})

const userUpload = multer({ storage: userStorage, fileFilter: fileFilter })
const postUpload = multer({ storage: postStorage, fileFilter: fileFilter })
module.exports = {
  userUpload,
  postUpload,
}
