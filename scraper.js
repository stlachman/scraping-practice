const cheerio = require("cheerio");
const axios = require("axios");

const siteUrl = "https://newyork.craigslist.org/search/aap";

const apartments = [];

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const getResults = async () => {
  const $ = await fetchData();

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

  return apartments;
};

module.exports = getResults;
