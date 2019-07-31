const express = require("express");
const router = express.Router();
const getResults = require("../scraper");

router.get("/", async function(req, res, next) {
  const result = await getResults();
  res.send(result);
});

module.exports = router;
