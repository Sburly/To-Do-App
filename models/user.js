const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "An email is needed"],
        unique: [true, "This email is already in use"]
    }
});
UserSchema.plugin(passportLocalMongoose);

const model = mongoose.model("User", UserSchema)
module.exports = model;