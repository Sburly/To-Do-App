const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("user/register");
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password); 
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.redirect("/");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/register");
    };
};

module.exports.renderLogin = (req, res) => {
    res.render("user/login");
};

module.exports.login = async (req, res) => {
    res.redirect("/");
};

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
      if (err) return next(err);
      res.redirect('/login');
    });
};