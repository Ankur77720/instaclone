var express = require('express')
var router = express.Router()
var post = require('./post')
var user = require('./user')
var comment = require('./comment')
var passport = require('passport')
var locaStrategy = require('passport-local')
var multer = require('./multer')
passport.use(new locaStrategy(user.authenticate()))

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.redirect('/login')
}

/* GET home page. */
router.get('/', isloggedIn, function (req, res, next) {
  res.render('index', { title: 'Express' })
})
// Register user
router.get('/register', (req, res, next) => {
  res.render('register')
})
router.post(
  '/register',
  multer.userUpload.single('image'),
  (req, res, next) => {
    var newUser = {
      //user data here
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.file.filename,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      address: req.body.address,
      //user data here
    }
    user
      .register(newUser, req.body.password)
      .then((result) => {
        passport.authenticate('local')(req, res, () => {
          //destination after user register
          res.redirect('/')
        })
      })
      .catch((err) => {
        res.send(err)
      })
  },
)
// Register user

// Login User
router.get('/login', (req, res, next) => {
  res.render('login')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  (req, res, next) => {},
)
// Login User

// logout Use
router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) res.send(err)
      else res.redirect('/')
    })
  else {
    res.redirect('/')
  }
})
// logout User
module.exports = router
