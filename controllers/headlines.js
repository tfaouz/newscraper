var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var Headline = require("../models/Headline");
// require require

module.exports = {
    fetch: async function () {
        const articles = await scrape();
        //console.log(articles);
        try {
            for (var article in articles) {
                article.date = makeDate();
                article.saved = false;
                console.log(article);
                await Headline.findOneAndUpdate({ url: article.url }, article, { upsert: true });
            }
        } catch (err) {
            console.log(err);
        }
    },

    delete: function (query, cb) {
        Headline.remove(query, cb);
    },

    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
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