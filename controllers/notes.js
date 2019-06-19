const Note = require("../models/Note");

async function get(data) {
  return await Note.find({
    _headlineId: data._id
  });
}

async function save(data) {
  const newNote = {
    _headlineId: data._headlineId,
    date: Date.now(),
    noteText: data.noteText
  };
  return await Note.create(newNote);
}

async function remove(data) {
  return await Note.deleteOne({ _id: data._id });
}

module.exports = {
  get: get,
  save: save,
  remove: remove,
};
