// mongoose = require("mongoose")
const Post = require('../models/Post');

exports.home = (req, res) => {
  res.render('index', {
    imgs: [{ id: 1 }, { id: 2 }, { id: 3 }]
  });
};

exports.profile = (req, res) => {
  res.render('profile');
};

exports.project = (req, res) => {
  res.render('project');
};

exports.gallery = (req, res) => {
  res.render('gallery');
};
