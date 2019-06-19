var Note = require("../models/Note");

async function get(data) {
        return await Note.find({
            _headlineId: data._id
        });
}

async function save(data) {
        let newNote = {
            _headlineId: data._id,
            date: Date.now(),
            noteText: data.noteText
        };
  return await Note.create(newNote);
}

async function remove(data) {
        await Note.remove({
            _id: data._id
        });
}

module.exports = {
  get: get,
  save: save,
  remove: remove,
};
