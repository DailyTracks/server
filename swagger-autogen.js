const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:8080/api",
  schemes: ["http"],
  "x-cors": {
    enabled: true,
    description:
      "Cross-Origin Resource Sharing (CORS) is supported for this API.",
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./api/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
