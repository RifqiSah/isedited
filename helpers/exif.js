const ExifImage = require('exif').ExifImage;

const check = (path) => {
    return new Promise((resolve, reject) => {
        try {
            new ExifImage({ image: path }, function (error, exifData) {
                if (error) {
                    resolve({
                        status: false,
                        data: null,
                        message: error.message,
                    });
                }
                else {
                    return resolve({
                        status: true,
                        data: exifData,
                        message: "success",
                    });
                }
            });
        } catch (error) {
            return reject({
                status: false,
                data: null,
                message: error.message,
            });
        }
    });
};

module.exports = { check };