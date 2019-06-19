
var scrape = require('../scripts/scrape');
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
  // renders home page
  router.get("/", function (req, res) {
    res.render("home");
  });

  // renders saved handlebars page
  router.get("/saved", function (req, res) {
    res.render("saved");
  });

  // runs function off fetch, pops up message when no new articles and new articles
  // request and response 
  router.get("/api/fetch", async function (_, res) {
    // upserted values
    const docs = await headlinesController.fetch();
    const result = docs.result;
    console.log(result);
    if (result.nUpserted && result.nUpserted > 0) {
      res.json({
	message: "Added " + result.nUpserted + " new articles!"
      });
    } else {
      res.json({
	message: "No new articles..."
      });
    }
  });
  router.get("/api/clear", async function (_, res) {
    await headlinesController.delete();
    res.render("home");
  });
  // issues with above doesnt pull articles
  // when router hits api headlines take request and respond
  router.get("/api/headlines", async function (req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }

    const data = await headlinesController.get(query);
    res.json(data);
  });

  router.delete("/api/headlines/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.patch("/api/headlines", function (req, res) {
    headlinesController.update(req.body, function (err, data) {
      res.json(data);
    });
  });
  // allows us to update if needed

  router.get("/api/notes/:headline_id?", function (req, res) {
    var query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    notesController.get(query, function (err, data) {
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.post("/api/notes", function (req, res) {
    notesController.save(req.body, function (data) {
      res.json(data);
    });
  });

}

// these need to be fixed
