const mongoose = require('mongoose')
const Cookbook = mongoose.model('Cookbook')
const Recipe = mongoose.model('Recipe')
const authorize = require('../../utils/authorize.js')

let editObject = (objectType, modelName) =>
  async (req, res) => {
    let object = await objectType.findOne({ 'slug': req.params.slug })

    if (!authorize(req.user.id, object.author)) {
        req.flash('warning', 'You must be the author to edit this!')
        res.redirect('/')
        return
    }

    res.render(`edit${modelName}`, {
        title: `Edit ${modelName}`,
        data: object
    })
  }

module.exports = editObject
