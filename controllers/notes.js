// controller for notes

var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {

    get: function (data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    // finds all notes associated with headline id

    save: function (data, cb) {
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        // creates object new note, headline id and date are passed through, note text is what user types in

        // passes new note with callback 
        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    // lets people remove notes 
    delete: function (data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};