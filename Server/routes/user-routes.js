const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.get("/test", (req, res) => {
  res.json({ message: "User Route Connected" });
});
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
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
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(userInfo => {
    if (userInfo) {
      return res.status(400).send("User already exist");
    } else {
      const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
      });
      newUser.save().then(user => {
        res.status(200).json(user);
      });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  User.findById(req.params.id)
    .then(targetUser => {
      if (targetUser) {
        targetUser
          .remove()
          .then(() => res.send("User has been successfully deleted"));
      } else {
        res.status(404).send("User does not exist");
      }
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, newUser) => {
      if (err) return res.status(500).send(err);
      return res.send(newUser);
    }
  );
});

module.exports = router;
