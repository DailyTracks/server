const axios = require("axios");
const { MAP } = require("../constants/env.constant");

const addressParser = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: MAP.GOOGLE.API_KEY,
          language: "ko", // 한국어로 결과 반환
        },
      }
    );

    const address = response.data.results[0].formatted_address.split(" ")[1];
    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = addressParser;
