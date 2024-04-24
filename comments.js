// Create web server for comment
import express from 'express';
const router = express.Router();
import Comment from '../models/comment';

// Create a new comment
router.post('/posts/:post/comments', function(req, res, next) {
    const comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
        if (err) { return next(err); }

        req.post.comments.push(comment);
        req.post.save(function(err) {
            if (err) { return next(err); }

            res.json(comment);
        });
    });
});

// Preload comment objects on routes with ':comment'
router.param('comment', function(req, _, next, id) {
    const query = Comment.findById(id);

    query.exec(function (err, comment){
        if (err) { return next(err); }
        if (!comment) { return next(new Error('can\'t find comment')); }

        req.comment = comment;
        return next();
    });
});

// Get comment
router.get('/posts/:post/comments/:comment', function(req, res) {
  res.json(req.comment);
});

// Upvote comment
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

// Export router
module.exports = router;