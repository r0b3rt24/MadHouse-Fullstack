const router = require("express").Router();
const passport = require("passport");

// auth login
router.get('/login', (req, res) =>{
    res.send('login page');
});

// auth logout
router.get('/logout', (req, res) => {
    res.send("logging out with passport");
})

// auth with google using passport.js
router.get('/google', passport.authenticate('google', {
    scope: ['profile'], // what do you want from google API
}));

// handle redirect using passport.js
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.send("welcome back");
});

module.exports = router;