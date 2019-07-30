const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://lancaster.craigslist.org/d/bicycles/search/bia";

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    console.log($);
    const bikeList = $(".content .result-row");
    const bikes = [];

    bikeList.each(function() {
      const price = $(this)
        .find(".result-info .result-price")
        .text();
      const title = $(this)
        .find(".result-info .result-title")
        .text();
      const link = $(this)
        .find(".result-info .result-title")
        .attr("href");
      bikes.push({
        price,
        title,
        link
      });
    });
    console.log(bikes);
  })
  .catch(console.error);
