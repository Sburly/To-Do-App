const Entry = require("../models/entry");

module.exports.renderHome = async (req, res) => {
    const entries = await Entry.find({ author: req.user._id });
    res.render("index", { entries });
};

module.exports.createEntry = async (req, res) => {
    const entry = new Entry(req.body);
    entry.author = req.user._id;
    await entry.save();
    res.redirect("/");
};

module.exports.editEntry = async (req, res) => {
    await Entry.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });
    res.redirect("/");
};

module.exports.updateEntry = async (req, res) => {
    const entry = await Entry.findByIdAndUpdate(req.body.id, { "status" : req.body.newStatus });
};

module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    await Entry.findByIdAndDelete(id);
    res.redirect("/");
};