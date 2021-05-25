const express = require('express');
const router = express.Router();

const path = require('path');
const { unlinkSync } = require('fs');

const { get, check } = require('../helpers/exif');
const { random } = require('../helpers/helper');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, random());
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res, next) => {
  const resp = {
    isedited: null,
    message: "",
    data: {},
  };

  const imagePath = path.join(__dirname, `../${req.file.path}`);

  try {
    // get exif data
    const imageMeta = await get(imagePath);

    resp.data = imageMeta.data;

    // check image
    const checker = check(imageMeta.data);

    resp.isedited = checker.edited;
    resp.message = checker.message;
  }
  catch (err) {
    console.error(err);

    resp.message = err.message;
    res.data = err;
  }

  unlinkSync(imagePath);

  resp.data = JSON.stringify(resp.data, null, 4);

  res.render('result', resp);
});

module.exports = router;
