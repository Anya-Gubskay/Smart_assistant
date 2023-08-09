const multer = require("multer");
const moment = require("moment");
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../../../../../uploads1');
  },

  filename(rea, file, cb) {
    const date = moment().format("DDMMYYYY-HHmmss_SSS");
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  
  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(nill, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({ storage, fileFilter, limits });
