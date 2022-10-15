const Entry = require("../models/entry");

module.exports.renderHome = async (req, res) => {
    for(let i of req.session.modifications) await Entry.findByIdAndUpdate(i[0], { "status" : i[1] });
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

module.exports.updateEntry = (req, res) => {
    let newArray = [];
    for(let i of req.session.modifications) {
        if(i[0] != req.body.id) newArray.push(i);
    };
    newArray.push([req.body.id, req.body.newStatus]);
    req.session.modifications = newArray;
    req.session.save();
};

module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    await Entry.findByIdAndDelete(id);
    res.redirect("/");
};