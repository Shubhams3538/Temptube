// using multer as a middlware whenever user uploads a file
// it will be on the server for some time the we will
// use cloudinary

import multer from 'multer';

const storage = multer.diskStorage({
  // cb means callback
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
