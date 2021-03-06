const ExifImage = require('exif').ExifImage;

const cameraData = require('../data/camera.json');
const softwareData = require('../data/software.json');
const makeData = require('../data/make.json');

const get = (path) => {
    return new Promise((resolve, reject) => {
        try {
            new ExifImage({ image: path }, function (error, exifData) {
                if (error) {
                    reject({
                        status: false,
                        data: null,
                        message: error.message,
                    });
                }
                else {
                    console.log(exifData);

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

const check = (exif) => {
    const ret = {
        edited: false,
        message: "This image is original!",
    };

    // const cameraMatch = cameraData.some(s => {
    //     if (exif.image.Make) {
    //         return new RegExp(s).test(exif.image.Make);
    //     }
    // });

    // if (cameraMatch) {
    //     ret.edited = true;
    //     ret.message = `This image is edited with ${exif.image.Model}!`;

    //     return ret;
    // }

    // software
    const softwareMatch = softwareData.some(s => {
        if (exif.image.Software) {
            return new RegExp(s).test(exif.image.Software);
        }
    });

    if (softwareMatch) {
        ret.edited = true;
        ret.message = `This image is edited with <b>${exif.image.Software}</b>!`;

        return ret;
    }

    // make
    const makeMatch = makeData.some(s => {
        if (exif.image.Make) {
            return new RegExp(s).test(exif.image.Make);
        }
    });

    if (makeMatch) {
        ret.edited = true;
        ret.message = `This image is created with <b>${exif.image.Make}</b>!`;

        return ret;
    }

    return ret;
};

module.exports = { get, check };