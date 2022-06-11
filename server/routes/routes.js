const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');
const passport = require('passport');
const jwt               = require('jsonwebtoken');
require('../auth/steam');

// Multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});

let upload = multer({
    storage: storage
}).single('image');

router.get('/api/servers', API.fetchAllServers);
router.get('/api/servers/:id', API.fetchServerByID);
router.post('/api/servers', upload, API.createServer);
router.patch('/api/servers/:id', upload, API.updateServer);
router.delete('/api/servers/:id', API.deleteServer);
router.get('/api/user', (req, res) => {
    res.send(req.user);
});


router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
router.get('/steam/return',
  function(req, res, next) {
      req.url = req.originalUrl;
      next();
  }, 
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
// Export the router
module.exports = router;