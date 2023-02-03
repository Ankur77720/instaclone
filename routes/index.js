var express = require('express')
var router = express.Router()
var db = require('./db/mongoose')
var chat = require('./models/chat')
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
      firstName: '',
      lastName: '',
      pic: req.file.filename,
      chats: { userZero: {} },
      //user data here
    }
    user
      .register(newUser, req.body.password)
      .then(async (result) => {
        await result.save()
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
  let posts = await (await postModel.find().populate('owner')).reverse()
  res.render('feed', { posts: posts, userData: req.user })
})
// user feed

// likePost
router.get('/like/:postId', isloggedIn, async (req, res, next) => {
  let currentUser = await user.findOne({ username: req.user.username })
  let currentPost = await postModel.findOne({ _id: req.params.postId })
  let index = currentUser.likes.indexOf(req.params.postId)
  if (index == -1) {
    currentUser.likes.push(req.params.postId)
    currentPost.likes.push(currentUser._id)
    await currentPost.save()
    await currentUser.save()
    res.send(true)
  } else {
    currentUser.likes.splice(index, 1)
    currentPost.likes.splice(currentPost.likes.indexOf(currentUser._id), 1)
    await currentPost.save()
    await currentUser.save()
    res.send(false)
  }
})
// likePost
// Follow user
router.get('/follow/:userId', isloggedIn, async (req, res, next) => {
  let currentUser = await user
    .findOne({ username: req.user.username })
    .populate('chats')
  let followingUser = await user
    .findOne({ _id: req.params.userId })
    .populate('chats')
  let index = currentUser.following.indexOf(req.params.userId)
  if (index == -1) {
    if (currentUser.chats[followingUser.username] == undefined) {
      let newChat = await chat.create({
        firstUser: currentUser._id,
        secondUser: followingUser._id,
        roomId:
          currentUser.username > followingUser.username
            ? `${followingUser.username}${currentUser.username}`
            : `${currentUser.username}${followingUser.username}`,
      })
      currentUser.chats.set(followingUser.username, newChat)
      followingUser.chats.set(currentUser.username, newChat)
    }
    currentUser.following.push(req.params.userId)
    followingUser.followers.push(currentUser._id)
    await followingUser.save()
    await currentUser.save()
    currentUser = await user.findOne({ username: currentUser.username })
    res.send(true)
  } else {
    currentUser.following.splice(index, 1)
    followingUser.followers.splice(
      followingUser.followers.indexOf(currentUser._id),
      1,
    )
    await followingUser.save()
    await currentUser.save()
    res.send(false)
  }
})
// Follow user
// chats routes
router.get('/chats', isloggedIn, async (req, res, next) => {
  let currentUser = await user
    .findOne({ username: req.user.username })
    .populate('following')
  res.render('chats', { userData: currentUser })
})
router.get('/chats/:userId', isloggedIn, async (req, res, next) => {
  let oppositeUser = await user.findById(req.params.userId)
  let currentUser = await user
    .findOne({ username: req.user.username })
    .populate('following')
  res.render('chats', { userData: currentUser })
})
// chats routes
module.exports = router
