// Requires axios and cheerio to make the scrape possible

var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

// has call back param
// requests nyt error response and body

var scrape = function (cb) {
    request("https://www.nytimes.com/", function (err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];

        $(".theme-summery").each(function (i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();
            // grabs text cuts off white space at end
            console.log("scrape working")


            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                // if head exists and if sum exists
                // replaces regex method, cleans it up with white space

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);

            }
        });
        cb(articles);
        //sends us all the articles
    });
}
//exports big scrape variable

module.exports = scrape;