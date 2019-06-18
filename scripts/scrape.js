const axios = require("axios");
const cheerio = require("cheerio");

const URL = 'https://lobste.rs';

async function scrape(cb) {
    const response = await axios.get(URL);
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    let articles = [];
    $('.u_url').each(function (i, element) {
        /*
        let link = $(element).find("a").attr("href");
        let head = $(element).find("h2.headline").text().trim();
        let sum = $(element).find("p.summary").text().trim();
        // grabs text cuts off white space at end
        console.log("scrape working")

        let dataToAdd = {
            link: link,
            headline: head,
            summary: sum
        };

        console.log('pushing article');
        
        articles.push(dataToAdd);
        */
    });
}

module.exports = scrape;