const express = require("express");
const fs = require("fs");
const router = express.Router();
const fetchData = require("../scraper");
const siteUrl = "https://newyork.craigslist.org/search/aap";

router.get("/", async function(req, res, next) {
  const results = await fetchData(siteUrl);
  res.send("Compiling data");
});

module.exports = router;
