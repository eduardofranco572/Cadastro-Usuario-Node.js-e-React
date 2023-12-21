const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, 'a' + Date.now() + '.jpg');
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
