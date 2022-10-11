// Modules
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const engine = require("ejs-locals");
const bodyParser = require('body-parser');
// Imports
const Entry = require("./models/entry");

// Express App Settings
const app = express();
let port = 3000;
app.set('view engine', 'ejs');
app.engine("ejs", engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDatabase Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));

function tagsFormat(input) {
    tags = [];
    for(let tag of input.split("%,%")){
        if (tag != "") {
            tags.push(tag);
        };
    };
    return tags
}

app.get("/", async (req, res) => {
    const entries = await Entry.find();
    res.render("index", { entries });
});

app.post("/", async (req, res) => {
    req.body.tags = tagsFormat(req.body.tags);
    const entry = new Entry(req.body);
    await entry.save();
    res.redirect("/");
});

app.put("/:id", async (req, res) => {
    req.body.tags = tagsFormat(req.body.tags);
    await Entry.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });
    res.redirect("/");
});

app.patch("/:id", async (req, res) => {
    const entry = await Entry.findByIdAndUpdate(req.body.id, { "status" : req.body.newStatus });
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Entry.findByIdAndDelete(id);
    res.redirect("/");
});

// App Listening
app.listen(port, () => {
    console.log("http://localhost:" + port);
});