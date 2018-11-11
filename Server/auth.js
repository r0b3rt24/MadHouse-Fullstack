const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "735048709642-4dau9j4ku1ur65q4kqfsqqn3t0e08dct.apps.googleusercontent.com",
            clientSecret: "735048709642-4dau9j4ku1ur65q4kqfsqqn3t0e08dct",
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};