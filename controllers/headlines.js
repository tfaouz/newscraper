const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/date");
const Headline = require("../models/Headline");

// require require

module.exports = {
  fetch: async function () {
    const articles = await scrape();
    const match = ['link'];

    for (var article in articles) {
      article.date = makeDate();
      article.saved = false;
    }
    try {
      return await Headline.upsertMany(articles, match);
    } catch (err) {
      console.log(err);
    }
  },

  delete: function (query, cb) {
    Headline.remove(query, cb);
  },

  get: async function (query) {
    return await Headline.find(query).sort({ _id: -1 });
  },

  update: function (query, cb) {
    Headline.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
}

// when run fetch run fuction pass cb into function then run scrape, set data to articles and goes through articles, runs make date function
//fetch grabs all the articles in the scrape
//
