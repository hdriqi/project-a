import multer from 'multer'

var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})

export default multer({ storage: storage }).array('file')