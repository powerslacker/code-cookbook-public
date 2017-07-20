const mongoose = require('mongoose')
const Cookbook = mongoose.model('Cookbook')
const Recipe = mongoose.model('Recipe')
const authorize = require('../../utils/authorize.js')


destroyObject = (objectType) => 
  async (req, res) => {
    let redirectRoute = req.header('Referrer')
    let object = await objectType.findOne({ _id: req.params.id })

    // user must be authorized before deletion
    if (!authorize(req.user.id, object.author)) {
        req.flash('warning', 'You must be the author to destroy this!')
        // return to previous rotue or go home
        res.redirect(redirectRoute || '/')
        return
    }

    await objectType.findOneAndRemove({ _id: req.params.id })
    req.flash('success', `${object.title} succesfully removed!`)
    // return to previous rotue or go home
    res.redirect( redirectRoute || '/')
  }

module.exports = destroyObject