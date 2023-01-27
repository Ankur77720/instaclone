var express = require('express')
var router = express.Router()
var db = require('./db/mongoose')
var user = require('./models/users')
var postModel = require('./models/post')
var commentModel = require('./models/comment')
const localStrategy = require('passport-local')
const { userUpload, postUpload } = require('./fileHandling/multer')
const passport = require('passport')
passport.use(new localStrategy(user.authenticate()))

// isloggedIN
function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.redirect('/login')
}
// isloggedIN

// passport integration and routes and make routes in different files for user,post and comment
// models are created
/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.error = ''
  res.render('form')
})

// Register user
router.post('/register', userUpload.single('pic'), (req, res, next) => {
  try {
    var newUser = {
      //user data here
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      pic: req.file.filename,
      //user data here
    }
    user
      .register(newUser, req.body.password)
      .then((result) => {
        passport.authenticate('local')(req, res, () => {
          //destination after user register
          res.redirect('/profile')
        })
      })
      .catch((err) => {
        res.locals.error = `${err.message}!`
        res.render('form')
      })
  } catch (err) {
    res.locals.error = `${err.message}!`
    res.render('form')
  }
})
// Register user

// Login user
router.get('/login', (req, res, next) => {
  res.locals.error = ''
  res.render('login')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/loginFail',
  }),
  (req, res, next) => {},
)
router.get('/loginFail', (req, res, next) => {
  res.locals.error = 'Credentials not Valid !'
  res.render('login')
})
// Login user

// logout user
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
// logout user

// profile
router.get('/profile', isloggedIn, (req, res, next) => {
  res.render('profile', { userData: req.user })
})
// profile

module.exports = router
