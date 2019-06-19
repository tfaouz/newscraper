const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// req mongoose uses mongoose method to create schema

const noteSchema = new Schema({
  _headlineId: { type: Schema.ObjectId },
  date: { type: Date, default: Date.now },
  noteText: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
