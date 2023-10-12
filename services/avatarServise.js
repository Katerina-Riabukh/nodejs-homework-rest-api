const multer = require("multer");
// const sharp = require("sharp");
const jimp = require("jimp");
const path = require("path");
const uuid = require("uuid").v4;
const fse = require("fs-extra");

const { errorHendler } = require("../helpers");

class AvatarServise {
  static initUploadMiddelware(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(errorHendler(400, "Please, upload images only!!!"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    if (file.size > (options?.maxSize || 1 * 1024 * 1024))
      throw errorHendler(400, "File size is larger then allowed.");

    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir("fullFilePath");

    const image = await jimp.read(file.buffer);
    await image.resize(250, 250);
    await image.writeAsync(path.join(fullFilePath, fileName));
    // await sharp(file.buffer)
    //   .resize({ height: options?.height || 300, width: options?.width || 300 })
    //   .toFormat("jpeg")
    //   .jpeg({ quality: 90 })
    //   .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = AvatarServise;
