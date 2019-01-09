const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Order = require("../models/order");
const validator = require("validator");

router.get("/:id", (req, res) => {
  Comment.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(err => {
      res.status(404).send("User not found");
    });
});

router.post("/add-comment", (req, res) => {
  if (
    validator.isMongoId(req.body.user) &&
    validator.isMongoId(req.body.order)
  ) {
    User.findById(req.body.user).then(owner => {
      if (owner) {
        Order.findById(req.body.order).then(targetOrder => {
          if (targetOrder) {
            const newComment = new Comment({
              user: req.body.user,
              order: req.body.order,
              rating: req.body.rating,
              comment: req.body.comment
            });
            newComment.save().then(user => {
              res.status(200).json(user);
            });
          } else {
            res
              .status(404)
              .send("Cannot add comment because order does not exist");
          }
        });
      } else {
        res.status(404).send("Cannot add comment because user does not exist");
      }
    });
  } else {
    res.status(400).send("Invalid ObjectId, please send the correct request");
  }
});

router.delete("/delete-comment/:id", (req, res) => {
  if (validator.isMongoId(req.params.id)) {
    Comment.findById(req.params.id).then(targetComment => {
      if (targetComment) {
        User.findById(targetComment.user).then(owner => {
          if (owner) targetComment.remove();
          else
            res
              .status(404)
              .send("Cannot delete comment beacuse the user does not exist");
        });
      } else {
        res
          .status(404)
          .send("Cannot delete comment because the comment does not exist");
      }
    });
  } else {
    res.status(400).send("Invalid ObjectId, please send the correct request");
  }
});
module.exports = router;
