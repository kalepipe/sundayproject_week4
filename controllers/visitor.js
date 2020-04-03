const mongoose = require('mongoose');
const GuestPost = require('../models/GuestPost');

exports.visitorPageView = (req, res) => {
  GuestPost.find()
    .sort({ $updatedDate: 1 })
    .then(guestPostLists => {
      const guestPosts = guestPostLists;
      res.render('visitor', { guestPosts: guestPosts }); //데이터베이스에 저장 된 전체 리스트가 ejs를 통해 화면에 뿌려진다.
    })
    .catch(() => {
      res.render('404');
    });
};

exports.createPost = (req, res) => {
  let guestPost = new GuestPost({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content
  });
  guestPost
    .save()
    .then(result => {
      // console.log(result);
      res.redirect('/visitor'); //여기서 화면 전환이 일어난다.
    })
    .catch(error => console.log(error));
};

exports.updatePost = (req, res) => {
  console.log(req.body.content);
  const postId = req.params.postId; //요청을 어떻게 하는지부터 확인한다
  const content = req.body.content;

  if (mongoose.Types.ObjectId.isValid(postId)) {
    GuestPost.findByIdAndUpdate(
      postId,
      {
        $set: {
          content: content,
          updatedDate: new Date(),
          updated: true
        }
      },
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
