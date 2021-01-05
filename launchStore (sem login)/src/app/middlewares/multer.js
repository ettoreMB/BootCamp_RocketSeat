const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  const isAccepted = ['image/png', 'image/jpeg', 'image/jpg',]
    .find(acceptedFormat => acceptedFormat = file.mimetype)

  if (isAccepted) {
    return cb(null, true)
  }

  cb(null, false)
  return cb(new Error('Apenas imagens png/jpeg e jpg'))
  
}

module.exports = multer({
  storage,
  fileFilter
})