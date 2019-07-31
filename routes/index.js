const express = require("express");
const fs = require("fs");
const router = express.Router();
const getResults = require("../scraper");

router.get("/", async function(req, res, next) {
  const results = await getResults();
  let jsonString = JSON.stringify(results);
  fs.writeFileSync("output.json", jsonString, "utf-8");
  res.send(results);
});

module.exports = router;
