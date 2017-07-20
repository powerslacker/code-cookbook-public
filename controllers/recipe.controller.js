const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const authorize = require('../utils/authorize.js')
const destroyObject = require('./helpers/destroyObject')
const editObject = require('./helpers/editObject')
const updateObject = require('./helpers/updateObject')
const readAllObjects = require('./helpers/readAllObjects')


exports.create = async (req, res) => {
  req.body.author = req.user.id
  let recipe = new Recipe(req.body)
  await recipe.save()
  res.redirect('/')
}

exports.destroy = destroyObject(Recipe)
exports.edit    = editObject(Recipe, 'Recipe')

exports.new = (req, res) => {
  let recipe = new Recipe()
  res.render('editRecipe', {
    title: 'New Recipe'
  })
}

exports.read = async (req, res) => {
  let recipe = await Recipe.findOne({ 'slug': req.params.slug })
  let data = [recipe]
  let authorized = req.user && authorize(req.user.id, recipe.author)
  res.render('viewRecipes', {
    data,
    authorized
  })
}

exports.readAll = readAllObjects(Recipe, 'Recipe')

exports.search = async (req, res) => {
  let results = []
  if (req.query.q) {
    results = await Recipe.find(
      { $text: { $search: req.query.q } },
      { score: { $meta: 'textScore'} }
    )
    .sort({ score: { $meta: 'textScore'} })
    .limit(5)
  }

  // search is accessible via json, so we hide the irrelevant info
  sanitized_results = results.map(result => {
    return { title: result.title, slug: result.slug, content: result.content }
  })

  res.json(sanitized_results)
}

exports.update = updateObject(Recipe)