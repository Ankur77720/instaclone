const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
// multer is to implement,
const fileFilter = (req, file, cb) => {
  var fileType = file.mimetype
  fileType = fileType.split('/')
  fileType = fileType[0]
  if (fileType === 'image') {
    return cb(null, true)
  }
  return cb(new Error('File is not a ImageType'))
}
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/userUploads')
  },
  filename: function (req, file, cb) {
    const fn = `${Date.now()}-${crypto
      .randomBytes(12)
      .toString('hex')}${path.extname(file.originalname)}`
    cb(null, fn)
  },
})
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/postUploads')
  },
  filename: function (req, file, cb) {
    const fn = `${Date.now()}-${crypto
      .randomBytes(12)
      .toString('hex')}${path.extname(file.originalname)}`
    cb(null, fn)
  },
})

const userUpload = multer({ storage: userStorage, fileFilter: fileFilter })
const postUpload = multer({ storage: postStorage, fileFilter: fileFilter })
module.exports = { userUpload, postUpload }
