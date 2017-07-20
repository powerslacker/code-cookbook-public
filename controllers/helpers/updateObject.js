const mongoose = require('mongoose')
const Cookbook = mongoose.model('Cookbook')
const Recipe = mongoose.model('Recipe')
const authorize = require('../../utils/authorize.js')

let updateObject = (objectType) =>
  async (req, res) => {
    let object_data = await objectType.findOne({ 'slug': req.params.slug })

    if (!authorize(req.user.id, object_data.author)) {
      req.flash('warning', 'You must be the author to update this!')
      // return to previous rotue or go home
      res.redirect(redirectRoute || '/')
      return
    }

    let object = await objectType.findOneAndUpdate(
      { 'slug': req.params.slug }, 
      req.body, 
      { new: true, runValidators: true }
    ).exec()
    res.redirect(req.header('Referrer') || '/')
  }

module.exports = updateObject
