const { catchErrors, flashValidationErrors } = require('../handlers/error.handler')
const cookbook        = require('../controllers/cookbook.controller')
const ensureLoggedIn  = require('connect-ensure-login').ensureLoggedIn()
const express         = require('express')
const landing         = require('../controllers/landing.controller')
const passport        = require('passport')
const router          = express.Router()
const recipe          = require('../controllers/recipe.controller')

// home
router.get('/', landing.home)

// authentication (via Auth0 & passport)
router.get('/login', landing.login)
router.get('/logout', landing.logout)
router.get('/callback',
  passport.authenticate('auth0', { 
    failureRedirect: '/', 
    failureFlash: 'There was a problem logging in.', 
    successFlash: 'You are now logged in!' 
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/')
  }
)


// search recipe
router.get('/search', catchErrors(recipe.search))
// view recipe
router.get('/recipe/view/:slug', catchErrors(recipe.read))
// new recipe
router.get('/recipe/edit', ensureLoggedIn, recipe.new)
router.post('/recipe/edit', ensureLoggedIn, catchErrors(recipe.create), flashValidationErrors)
// edit recipe
router.get('/recipe/edit/:slug', ensureLoggedIn, catchErrors(recipe.edit))
router.post('/recipe/edit/:slug', ensureLoggedIn, catchErrors(recipe.update), flashValidationErrors)
// destroy recipe
router.get('/recipe/delete/:id', ensureLoggedIn, catchErrors(recipe.destroy))
// view all recipe created by currently logged in account
router.get('/recipe/:user_id', ensureLoggedIn, catchErrors(recipe.readAll))


// view cookbooks
router.get('/cookbook/view/:slug', cookbook.read)
router.get('/cookbook/:user_id', ensureLoggedIn, cookbook.readAll)
router.get('/cookbook/getAll/:user_id', cookbook.getAll)

// save cookbook
router.post('/cookbook/new', ensureLoggedIn, catchErrors(cookbook.create))
// add to cookbook
router.put('/cookbook/addRecipe/:cookbook_id', ensureLoggedIn, catchErrors(cookbook.addRecipe))
// edit cookbook
router.get('/cookbook/edit/:slug', ensureLoggedIn, catchErrors(cookbook.edit))
router.post('/cookbook/edit/:slug', catchErrors(cookbook.update), flashValidationErrors)
// destroy cookbook
router.get('/cookbook/delete/:id', ensureLoggedIn, catchErrors(cookbook.destroy))
//remove a recipe from a cookbook
router.get('/cookbook/removeRecipe/:cookbook_id/:recipe_id', ensureLoggedIn, catchErrors(cookbook.removeRecipe))

module.exports = router