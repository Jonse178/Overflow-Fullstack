const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (!(username == "admin")){
            return done(null, false, { message: 'Incorrect username.' })
        }
        if (!(password == "Password123")){
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null,  { username: username });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});