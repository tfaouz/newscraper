var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var Headline = require("../models/Headline");
// require require

module.exports = {

    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
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