const router = require("express").Router;
const passport = require("passport");

// auth login
router.get('/login', (req, res) =>{
    res.sned('login page');
});

// auth logout
router.get('/logout', (req, res) => {
    res.send("logging out with passport");
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'], // what do you want from google API
}));

// handle redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.send("welcome back");
});

module.exports = router;