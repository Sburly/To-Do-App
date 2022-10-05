// Modules
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Express App Settings
const app = express();
let port = 3000;
app.set('view engine', 'ejs');
app.engine("ejs", ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDatabase Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));

app.get("/", (req, res) => {
    res.render("index");
})

// App Listening
app.listen(port, () => {
    console.log("http://localhost:" + port);
});