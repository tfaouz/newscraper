var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    // makes headline unique so its not grabbing the same thing 2x

    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
    //defaults false but will be switched to true when saved article
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;