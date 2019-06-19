const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/date");
const Headline = require("../models/Headline");

async function fetch () {
  const match = ['link'];

  let articles = [];
  let ret = {};

  try {
    articles = await scrape();
  } catch (err) {
    console.log(err);
  }

  for (var article in articles) {
    article.date = makeDate();
    article.saved = false;
  }

  try {
    ret = await Headline.upsertMany(articles, match);
  } catch (err) {
    console.log(err);
  }

  return ret;
}

async function remove() {
  return await Headline.remove({});
}

async function get(query) {
  return await Headline.find(query).sort({ _id: -1 });
}

async function update(query) {
  return await Headline.updateOne({ _id: query._id }, { $set: query}, {});
}

module.exports = {
  fetch: fetch,
  remove: remove,
  get: get,
  update: update,
};
