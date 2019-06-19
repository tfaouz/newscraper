var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
  router.get("/", function (_, res) {
    res.render("home");
  });

  router.get("/saved", function (_, res) {
    res.render("saved");
  });

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
    await headlinesController.remove();
    res.render("home");
  });

  router.get("/api/headlines", async function (req, res) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }

    const data = await headlinesController.get(query);
    res.json(data);
  });

  router.delete("/api/headlines/:id", async function (req, res) {
    let query = {};
    query._id = req.params.id;
    const data = await headlinesController.remove(query);
    res.json(data);
  });

  router.patch("/api/headlines", async function (req, res) {
    const data = await headlinesController.update(req.body);
    res.json(data);
  });

  router.get("/api/notes/:headline_id?", async function (req, res) {
    let query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    const data =  await notesController.get(query);
    res.json(data);
  });

  router.delete("/api/notes/:id", async function (req, res) {
    let query = {};
    query._id = req.params.id;
    const data = await notesController.delete(query);
    res.json(data);
  });

  router.post("/api/notes", async function (req, res) {
    const data = await notesController.save(req.body);
    res.json(data);
  });
};

// these need to be fixed
