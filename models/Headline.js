const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const headlineSchema = new Schema({
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

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;