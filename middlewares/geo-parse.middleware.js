const exif = require("exif-parser");
const fs = require("fs");
const addressParser = require("../utils/address-parser");

/**
 *
 * @description
 *  메타데이터 파싱 후 클라이언트에게 어떤식으로 말할지 고민하면 좋을 듯함/
 */
module.exports = async (req, res, next) => {
  try {
    if (req.body.region) next();

    const files = [];
    const address = [];
    req.files.map((file) => {
      const filePath = `/${file.destination}${file.filename}`;

      fs.readFile(filePath, (err, data) => {
        if (err) {
          return res.status(500).send("Error reading image file");
        }

        const parser = exif.create(data);
        const result = parser.parse();

        // 위도와 경도 추출
        const latitude = result.tags.GPSLatitude;
        const longitude = result.tags.GPSLongitude;
        if (latitude && longitude) {
          const parsedAddress = addressParser(latitude, longitude);
          files.push(filePath);
          address.push(parsedAddress);
        }
      });
      req.imgData = files;
      req.address = address;
    });
  } catch (err) {
    next(err);
  }
};

