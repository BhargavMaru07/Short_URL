const express = require("express");
const router = express.Router();
const {
  handleUrlShort,
  handleRequest,
  handleGetAnalytic,
} = require("../controller/urlControl");

router.post("/", handleUrlShort);
router.get("/:shortID", handleRequest);
router.get("/analytic/:shortID", handleGetAnalytic);

module.exports = {
  router,
};
