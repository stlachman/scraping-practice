const cheerio = require("cheerio");
const fs = require("fs");
const fsp = require("fs").promises;

const axios = require("axios");

const outputFile = "apartments.json";
const lowerPrice = "lower.json";
const apartments = [];
let lowerPricePoint = [];
const pageLimit = 25;
let pageCounter = 0;

const fetchData = async url => {
  try {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

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
      const hood = $(this)
        .find(".result-info .result-hood")
        .text();
      apartments.push({
        price,
        title,
        link,
        hood
      });
    });

    const nextPageLink = $(".paginator")
      .find(".next.button")
      .attr("href");
    pageCounter++;

    if (pageCounter === pageLimit) {
      exportResults(apartments);
      return false;
    }

    fetchData(`https://newyork.craigslist.org${nextPageLink}`);
  } catch (error) {
    exportResults(apartments);
  }
};

const exportResults = apartments => {
  fs.writeFile(outputFile, JSON.stringify(apartments, null, 4), err => {
    if (err) {
      console.log(err);
    }
    console.log(`Results exported successfully`);
  });
  // fsp
  //   .readFile("apartments.json", (err, data) => {
  //     const result = JSON.parse(data);
  //     for (let key in result) {
  //       let price = result[key]["price"].substring(1);
  //       if (Number(price) < 1800) {
  //         lowerPricePoint.push(result[key]);
  //         // console.log(result[key]);
  //       }
  //     }
  //     // console.log(lowerPricePoint);
  //     return lowerPricePoint;
  //   })
  //   .then(data => {
  //     console.log(data);
  //     fs.writeFile(
  //       lowerPrice,
  //       JSON.stringify(lowerPricePoint, null, 4),
  //       err => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         console.log(`Prices exported successfully`);
  //       }
  //     );
  //   });
};

module.exports = fetchData;
