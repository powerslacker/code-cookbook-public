const mongoose = require('mongoose')
const Cookbook = mongoose.model('Cookbook')
const authorize = require('../utils/authorize.js')
const destroyObject = require('./helpers/destroyObject')
const editObject = require('./helpers/editObject')
const updateObject = require('./helpers/updateObject')
const readAllObjects = require('./helpers/readAllObjects')


exports.addRecipe = async (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*")
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  let cookbook_data = await Cookbook.findOne({ "_id": req.params.cookbook_id })
  if (!authorize(req.user.id, cookbook_data.author)) {
    res.json({"message": "There was an issue adding that to the cookbook", "type": "warning"})
    return
  }

  let cookbook = await Cookbook.findOneAndUpdate(
    { '_id': req.params.cookbook_id },
    { $push: { recipes: req.body.recipe }
  }).exec()
  res.json({"message": "Recipe added to cookbook", "type": "success"})
}

exports.create = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if(!authorize(req.user.id, req.body.author)) {
    res.json({"message": "There was an issue creating cookbook", "type": "warning"})
    return
  }

  let cookbook = new Cookbook(req.body)
  await cookbook.save()
  res.json({"message": "New cookbook created and recipe added!", "type": "success"})
}

exports.destroy = destroyObject(Cookbook)
exports.edit = editObject(Cookbook, 'Cookbook')

exports.getAll = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  let cookbooks = await Cookbook.find({ 'author': req.params.user_id})
  res.json(cookbooks)
}

exports.readAll = readAllObjects(Cookbook, 'Cookbook')

exports.read = async (req, res) => {
  let cookbook = await Cookbook.findOne({ 'slug': req.params.slug})
  .populate({
    path: 'recipes',
    model: 'Recipe',
  })
  let authorized = authorize(req.user.id, cookbook.author)
  res.render('viewRecipes', {
    authorized,
    cookbook,
    data: cookbook.recipes,
    title: cookbook.title
  })
}

exports.removeRecipe = async (req, res) => {
  let cookbook = await Cookbook.findOne({ _id: req.params.cookbook_id })

  // user must be authorized to remove something from a cookbook
  if (!authorize(req.user.id, cookbook.author)) {
    req.flash('warning', 'You must be the author to remove this!')
    // return to previous route or go home
    res.redirect(req.header('Referrer') || '/')
    return
  }

  // remove recipe from cookbook
  let recipe_index = cookbook.recipes.indexOf(req.params.recipe_id)
  cookbook.recipes.splice(recipe_index, 1)

  await Cookbook.findOneAndUpdate({ _id: req.params.cookbook_id }, cookbook)
  req.flash('success', 'Recipe removed!')
  res.redirect(req.header('Referrer') || '/')
}

exports.update = updateObject(Cookbook)