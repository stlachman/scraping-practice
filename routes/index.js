const express = require("express");
const fs = require("fs");
const router = express.Router();
const getResults = require("../scraper");

router.get("/", async function(req, res, next) {
  const results = await getResults();
  let jsonString = JSON.stringify(results);
  fs.writeFileSync("apartments.json", jsonString, "utf-8");
  fs.readFile("apartments.json", (err, data) => {
    const result = JSON.parse(data);
    // console.log(result);
    for (let key in result) {
      let price = result[key]["price"].substring(1);
      if (Number(price) < 1800) {
        console.log(result[key]);
      }
    }
  });
  res.send(results);
});

module.exports = router;
