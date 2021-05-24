const express = require('express');
const router = express.Router();

const path = require('path');
const { unlinkSync } = require('fs');

const { check } = require('../helpers/exif');
const { random } = require('../helpers/helper');

const cameraData = require('../data/camera.json');
const softwareData = require('../data/software.json');

const multer  = require('multer')
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
    content: "Berhasil upload!",
    message: "",
    data: "",
  };

  const imagePath = path.join(__dirname, `../${req.file.path}`);
  const imageCheck = await check(imagePath).catch((err) => {
    console.error(err);
  });

  unlinkSync(imagePath);

  if (!imageCheck) {
    resp.message = 'an error occured!';
  }

  if (!imageCheck.success) {
    resp.message = imageCheck.message;
  }

  resp.data = JSON.stringify(imageCheck.data, null, 4);

  res.render('result', resp);
});

module.exports = router;
