const Post = require('../models/Post');
const mongoose = require('mongoose');

//Read
exports.viewPosts = (req, res) => {
  Post.find()
    .sort({ $natural: -1 })
    .exec()
    .then(result => {
      console.log(result);
      const posts = result;
      res.render('diary', { posts: posts });
    })
    .catch(err => {
      console.log(err);
      res.render('404');
    });
};

exports.viewPost = (req, res) => {
  const postId = req.params.postId;
  Post.findById({
    _id: postId
  })
    .then(result => {
      console.log(result);
      res.render('post', { post: result });
    })
    .catch(() => {});
};

//View
exports.writePost = (req, res) => {
  res.render('write', { post: null });
};

//Create
exports.createPost = (req, res, next) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content
  });

  newPost
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/diary');
    })
    .catch(err => {
      console.log(err);
    });
};

//Delete
exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.findOneAndDelete({ _id: postId })
    .then(() => {
      res.redirect('/diary');
    })
    .catch(error => {
      console.log(error);
      res.render('404');
    });
};
