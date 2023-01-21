var express = require('express')
var router = express.Router()
var db = require('./db/mongoose')
var userModel = require('./models/users')
var postModel = require('./models/post')
var commentModel = require('./models/comment')

// passport integration and routes and make routes in different files for user,post and comment
// models are created
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
