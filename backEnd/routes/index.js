var express = require('express')
var router = express.Router()
var post = require('./post')
var userModel = require('./users')
var comment = require('./comment')
var passport = require('passport')
var locaStrategy = require('passport-local')
var multer = require('./multer')
passport.use(new locaStrategy(userModel.authenticate()))

function isloggedIn(req, res, next) {
  console.log(req.body)
  if (req.isAuthenticated()) return next()
  else
    res.json({
      status: 401,
      message: 'you are not logged in',
    })
}

/* GET home page. */
router.get('/', isloggedIn, function (req, res, next) {
  res.render('index')
})
// Register userModel
router.get('/register', (req, res, next) => {
  res.render('register')
})
router.post('/register', (req, res, next) => {
  let newUser = new userModel({
    //userModel data here
    username: req.body.username,
    email: req.body.email,
    //userModel data here
  })
  userModel
    .register(newUser, req.body.password)
    .then((result) => {
      passport.authenticate('local')(req, res, () => {
        res.status(201).send(result)
      })
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})
// Register userModel

// user data
router.get('/userData', isloggedIn, async (req, res, next) => {
  delete req.hash
  delete req.salt
  res.send(req.user)
})
// user data

// Login User
router.get('/login', (req, res, next) => {
  res.render('login')
})
router.post(
  '/login',
  (req, res, next) => {
    return next()
  },
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFail',
  }),
  (req, res, next) => {},
)
router.get('/loginFail', (req, res, next) => {
  res.json({ status: 401, message: 'Not valid credential' })
})
router.get('/loginSuccess', (req, res, next) => {
  res.json({ status: 201, message: 'Login success' })
})
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

// userData
router.post('/userData', isloggedIn, async (req, res, next) => {
  let userData = await userModel.findOne({
    username: req.session.passport.user,
  })
  console.log('userData', userData)
  console.log(userData)
  res.json(userData)
})
// userData

//createPost
router.post(
  '/createPost',
  isloggedIn,
  multer.postUpload.array('image', 8),
  async (req, res, next) => {
    let currentUser = await userModel.findOne({
      username: req.session.passport.userModel,
    })
    let newPost = await post.create({
      owner: currentUser._id,
      caption: req.body.caption,
      post: req.files.map((elem) => elem.filename),
    })

    currentUser.posts.push(newPost._id)
    await currentUser.save()
    console.log(newPost)
    res.send(newPost)
  },
)
//createPost

module.exports = router
