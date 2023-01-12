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
  if (req.isAuthenticated()) return next()
  else
    res.json({
      status: 200,
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
router.post(
  '/register',
  multer.userUpload.single('image'),
  (req, res, next) => {
    let newUser = new userModel({
      //userModel data here
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      pic: req.file.filename,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      //userModel data here
    })
    userModel
      .register(newUser, req.body.password)
      .then((result) => {
        passport.authenticate('local')(req, res, () => {
          //destination after userModel register
          res.send(result)
        })
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
  },
)
// Register userModel

// Login User
router.get('/login', (req, res, next) => {
  res.render('login')
})
router.post(
  '/login',
  (req, res, next) => {
    console.log(req.body)
    return next()
  },
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFail',
  }),
  (req, res, next) => {},
)
router.get('/loginFail', (req, res, next) => {
  console.log(req.body)
  res.json({ status: 200, message: 'Not valid credential' })
})
router.get('/loginSuccess', (req, res, next) => {
  console.log(req.body)
  res.json({ status: 200, message: 'Login success' })
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
router.get('/userData', isloggedIn, async (req, res, next) => {
  let userData = await userModel.findOne({
    username: req.session.passport.user,
  })
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
    res.redirect('/')
  },
)
//createPost

module.exports = router
