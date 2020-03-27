const express = require('express');
const router = express.Router();
const indexController = require('./controllers/index');
const postController = require('./controllers/post');
const guestController = require('./controllers/visitor');

// const posts = require('../public/data/diary.json');

// home
router.get('/', indexController.home);

// profile
router.get('/profile', indexController.profile);

// project
router.get('/project', indexController.project);

// gallery
router.get('/gallery', indexController.gallery);

// diary
router.get('/diary', postController.diary);

// visitor
router.get('/visitor', guestController.visitorPageView);
router.post('/visitor', guestController.createPost);
router.post('/visitor/:postId/update', guestController.updatePost);
router.get('/visitor/:postId/delete', guestController.deletePost);

module.exports = router;
