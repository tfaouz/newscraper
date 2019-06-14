var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// req mongoose uses mongoose method to create schema

var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});


var Note = mongoose.model("Note", noteSchema);


module.exports = Note;
