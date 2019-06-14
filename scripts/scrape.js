// Requires axios and cheerio to make the scrape possible

var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com/", function (err, res, body) {

        var $ = cherio.load(body);

        var articles = [];

        $(".theme-summery").each(function (i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);

            }
        });
        cb(articles);

    });
}
module.exports = scrape;