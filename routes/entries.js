const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { validateEntry, tagsFormat, isLoggedIn } = require("../middlewares");
const entries = require("../controllers/entries");

router.route("/")
    .get(isLoggedIn, catchAsync(entries.renderHome))
    .post(isLoggedIn, tagsFormat, validateEntry, catchAsync(entries.createEntry));

router.route("/:id")
    .put(isLoggedIn, tagsFormat, validateEntry, catchAsync(entries.editEntry))
    .patch(isLoggedIn, catchAsync(entries.updateEntry))
    .delete(isLoggedIn, catchAsync(entries.deleteEntry));

module.exports = router;