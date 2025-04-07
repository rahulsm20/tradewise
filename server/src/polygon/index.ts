import "dotenv/config";
export const polygon = require("@polygon.io/client-js").restClient(
  process.env.POLYGON_API_KEY
);
