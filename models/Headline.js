const mongoose = require("mongoose");
const upsertMany = require('@meanie/mongoose-upsert-many');

const Schema = mongoose.Schema;
mongoose.plugin(upsertMany);

const headlineSchema = new Schema({
  link: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  },
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
