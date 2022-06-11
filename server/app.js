// Imports
require('dotenv').config();
const express           = require('express');
const cors              = require('cors');
const mongoose          = require('mongoose');
const app               = express();
const port              = process.env.PORT || 6000;
const passport          = require('passport');
const session           = require('express-session');
const SteamStrategy     = require('passport-steam').Strategy;
const jwt               = require('jsonwebtoken');
const Users             = require('./models/auth');


require('./auth/steam.js');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Steam Session Setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/steam/return',
    realm: 'http://localhost:5000/',
    apiKey: process.env.STEAM_API_KEY
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        profile.identifier = identifier;
        console.log(profile.identifier);
        console.log(identifier);
        Users.findById({ openId: identifier }, function (err, user) {
        return done(null, profile);
      });
    });
  }
));



// Database connection
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: true, 
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {   // Error handling
    console.log(err);
});


// Routes import
app.use('/', require('./routes/routes'));

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/test' }),
  function(req, res) {
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('http://localhost:8080/');
  });

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}).on('error', err => {   // Error handling
    console.log(err);
});