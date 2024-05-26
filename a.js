const express = require("express");
const axios = require("axios");
const { add } = require("winston");

const PORT = process.env.PORT || 3000;

// 구글 맵스 API 키
const GOOGLE_MAPS_API_KEY = "AIzaSyBT3ecra5NiWYxrxjuBba7UXig6nB6ZhEU";

(async () => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: "37.566826,126.9786567",
          key: GOOGLE_MAPS_API_KEY,
          language: "ko", // 한국어로 결과 반환
        },
      }
    );

    const address = response.data.results[0].formatted_address.split(" ")[1];
    console.log(address);
  } catch (error) {
    console.error("Error:", error);
  }
})();
