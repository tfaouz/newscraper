const axios = require("axios");
const cheerio = require("cheerio");

const URL = 'https://lobste.rs';

async function scrape() {
  const response = await axios.get(URL);
  // console.log(response.data);
  const $ = cheerio.load(response.data);

  let articles = [];
  $('.u-url').each(function (_, element) {
    let link = element.attribs.href;
    if (link.startsWith('/s/')) {
      link = URL + link;
    }
    const [first] = element.children;
    articles.push({ link: link, summary: first.data });
  });
  //console.log(articles);
  return articles;
}

module.exports = scrape;
