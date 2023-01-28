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
router.get('/profile', isloggedIn, async (req, res, next) => {
  let currentUser = await user
    .findOne({ username: req.user.username })
    .populate('posts')
  res.render('profile', { userData: currentUser })
})
// profile

// Create post
router.post(
  '/createPost',
  isloggedIn,
  postUpload.single('post'),
  async (req, res, next) => {
    var newPost = {
      owner: req.user._id,
      caption: req.body.caption,
      post: req.file.filename,
    }
    newPost = await postModel.create(newPost)
    let currentUser = await user.findOne({ username: req.user.username })
    currentUser.posts.push(newPost._id)
    await currentUser.save()
    res.redirect('back')
  },
)
// Create post

// user feed
router.get('/feed', isloggedIn, async (req, res, next) => {
  let posts = await postModel.find().populate('owner')
  res.render('feed', { posts: posts })
})
// user feed
module.exports = router
