const exif = require("exif-parser");
const fs = require("fs");
const addressParser = require("../utils/address-parser");

module.exports = async (req, res, next) => {
  try {
    if (req.body.region) return next();

    const files = [];
    const address = [];

    // Map each file to a promise that reads and processes the file
    const fileProcessingPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const filePath = `/${file.destination}${file.filename}`;
        
        fs.readFile(`.${filePath}`, async (err, data) => {
          if (err) {
            console.error(err);
            reject("Error reading image file");
          } else {
            const parser = exif.create(data);
            const result = parser.parse();

            // Extract latitude and longitude
            const latitude = result.tags.GPSLatitude;
            const longitude = result.tags.GPSLongitude;
            
            if (latitude && longitude) {
              try {
                const parsedAddress = await addressParser(latitude, longitude);
                files.push(filePath);
                address.push(parsedAddress);
                resolve(); // Resolve the promise
              } catch (error) {
                reject(error); // Reject with error if address parsing fails
              }
            } else {
              resolve(); // Resolve the promise if no GPS coordinates
            }
          }
        });
      });
    });

    // Wait for all file processing promises to complete
    await Promise.all(fileProcessingPromises);

    // Assign values to req.imgData and req.address after all files are processed
    req.imgData = files;
    req.address = address;

    next(); // Move to the next middleware
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

