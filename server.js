const express = require('express');
const passport = require('passport');
const session = require('express-session');  // session middleware
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const morgan = require('morgan');



const api = require('./api'); 
const middleware = require('./middleware');
const password = require('./password');
const port = process.env.PORT || 8889; 

const app = express();

app.use(morgan('combined'));

//Passport Configuration
app.use(session({
    secret: 'Th1s1smi5up3r53cretKeii1i2iii3iiiii4',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

//Parse in data from Json/www-x-form-encoded forms
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Application Login
app.post('/login', passport.authenticate('local', { successRedirect: './blog.html',
                                                    failureRedirect: './login.html'}
));

//API routing
app.get('/blog', api.listBlog);
app.post('/blog', connectEnsureLogin.ensureLoggedIn(), api.createBlog);
app.delete('/blog/:id', api.deleteBlog);

//Host static webpages
app.use('/', express.static('./src/public'));
app.use('/', connectEnsureLogin.ensureLoggedIn('./login.html'), express.static('./src/private'));

//Catch clauses
app.use(middleware.handleError); //Internal Error Handling
app.use(middleware.notFound); //Not Found Error

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`)) ;