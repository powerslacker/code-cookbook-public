const express     = require('express'),
bodyParser        = require('body-parser'),
cookieParser      = require('cookie-parser'),
expressValidator  = require('express-validator'),
app               = express(),
mongoose          = require('mongoose'),
dbConnect         = require('./utils/dbConnect'),
passport          = require('passport'),
Auth0Strategy     = require('passport-auth0'),
session           = require('express-session'),
flash             = require('connect-flash'),
MongoStore        = require('connect-mongo')(session)

// import enviornment variables
require('dotenv').config({ path: 'variables.env' })

// connect to db
dbConnect(process.env.DATABASE)

// import all models
require('./models/cookbook.model')
require('./models/recipe.model')

// uses pug to render templates
app.set('view engine', 'pug')

// use the public folder to host static assets
app.use(express.static('public'))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({
  secret: 'shhhh',
  key: 'ohyeah',
  resave: true,
  saveUnitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Exposes a bunch of methods for validating data.
app.use(expressValidator())

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash())

// Use passport for authorization management
app.use(passport.initialize())
app.use(passport.session())

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash()
  res.locals.user = req.user
  next()
})

const routes = require('./routes/index.routes')
app.use('/', routes)

// Configure Passport to use Auth0
const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT,
  clientSecret: process.env.AUTH0_SECRET,
  callbackURL:  process.env.AUTH0_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile)
})

passport.use(strategy)

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

// 404 handler
app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
})

// Start the app!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


module.exports = app