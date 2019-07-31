const express = require("express");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

const apartments = [];

app.get("/scrape", (req, res) => {
  url = "https://newyork.craigslist.org/search/aap";

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);

      const apartmentList = $(".content .result-row");

      apartmentList.each(function() {
        const price = $(this)
          .find(".result-info .result-price")
          .text();
        const title = $(this)
          .find(".result-info .result-title")
          .text();
        const link = $(this)
          .find(".result-info .result-title")
          .attr("href");
        apartments.push({
          price,
          title,
          link
        });
      });
    }
  });

  return fs.writeFile(
    "output.json",
    JSON.stringify(apartments, null, 4),
    function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output.json file"
      );
    }
  );
});

const port = 7000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
