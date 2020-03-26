const express = require("express")
const router = express.Router()
const indexController = require("./controllers/index")
// const postController = require("./controllers/post")
// const guestController = require("./controllers/visitor")

// const posts = require('../public/data/diary.json');

// home
router.get("/", indexController.home)

// profile
// router.get("/profile", (req, res) => {
//   res.render("profile.ejs")
// })

// project
// router.get("/project", (req, res) => {
//   res.render("project.ejs")
// })

// gallery
// router.get("/gallery", (req, res) => {
//   res.render("gallery.ejs")
// })

// diary
// router.get("/diary", (req, res) => {
//   res.render("diary")
// })

module.exports = router
