const Guestpost = require('../models/GuestPost');
const mongoose = require('mongoose');
const GuestPost = require('../models/GuestPost');

exports.visitorPageView = (req, res) => {
  GuestPost.find()
    .sort({ $updatedDate: 1 })
    .then(guestPostLists => {
      const guestPosts = guestPostLists;
      res.render('visitor', { guestPosts: guestPosts });
    })
    .catch(() => {
      res.render('404');
    });
};

exports.createPost = (req, res) => {
  console.log(req.body.content);

  let guestPost = new GuestPost({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content
  });

  guestPost
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/visitor');
    })
    .catch(error => console.log(error));
};

exports.updatePost = (req, res) => {
  console.log(req.body.content);
  const guestPostId = req.params.postId;

  if (mongoose.Types.ObjectId.isValid(guestPostId)) {
    GuestPost.findByIdAndUpdate(
      guestPostId,
      { $set: { content: req.body.content, updatedDate: new Date(), updated: true } },
      { new: true }
    )
      .then(updatedPost => {
        console.log(updatedPost);
        res.send(updatedPost);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.render('404');
  }
};

exports.deletePost = (req, res) => {
  const guestPostId = req.params.postId;
  console.log(guestPostId);
  GuestPost.deleteOne({ _id: guestPostId })
    .then(() => {
      res.redirect('/visitor');
    })
    .catch(error => {
      console.log('[delete error]' + error);
    });
};
