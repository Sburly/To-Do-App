const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    title: String,
    exDate: String,
    importance: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    description: String,
    tags: [String],
    status: {
        type: String,
        enum: ["to-do", "doing", "done"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Entry", EntrySchema)
module.exports = model;