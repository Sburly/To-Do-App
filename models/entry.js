const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    title: String,
    exDate: String,
    importance: String,
    description: String,
    tags: [String],
    status: String
});

const model = mongoose.model("Entry", EntrySchema)
module.exports = model;