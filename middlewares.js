const { entrySchema } = require("./schemas");
const Entry = require("./models/entry");

module.exports.tagsFormat = (req, res, next) => {
    tags = [];
    for(let tag of req.body.tags.split("%,%")){
        if (tag != "") tags.push(tag[0].toUpperCase() + tag.slice(1));
    };
    req.body.tags = tags;
    next();
};

module.exports.validateEntry = (req, res, next) => {
    const { error } = entrySchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(",");
        req.flash("error", msg);
        return res.redirect("/");
    } else {
        next();
    };
};

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must be signed in");
        return res.redirect("/login");
    };
    next();
};