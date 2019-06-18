const axios = require("axios");
const cheerio = require("cheerio");

const instance = axios.create({
    baseURL: 'https://www.nytimes.com/',
    timeout: 1000,
});

async function scrape(cb) {
    console.log('we made it');
    const items = await instance.request();
    console.log(items);
    /*       let $ = cheerio.load(body);
  
          let articles = [];
  
          $(".theme-summary").each(function (i, element) {
              let head = $(this).children(".story-heading").text().trim();
              let sum = $(this).children(".summary").text().trim();
              // grabs text cuts off white space at end
              console.log("scrape working")
  
  
              if (head && sum) {
                  let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                  let sumNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                  // if head exists and if sum exists
                  // replaces regex method, cleans it up with white space
  
                  let dataToAdd = {
                      headline: headNeat,
                      summary: sumNeat
                  };
                  articles.push(dataToAdd);
  
              }
          });
          cb(articles);
          //sends us all the articles
      }) */

}
//exports big scrape variable

module.exports = scrape;