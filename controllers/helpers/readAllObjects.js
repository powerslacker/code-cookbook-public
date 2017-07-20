const mongoose = require('mongoose')
const Cookbook = mongoose.model('Cookbook')
const Recipe = mongoose.model('Recipe')
const authorize = require('../../utils/authorize.js')

readAllObjects = (objectType, objectName) =>
  async (req, res) => {
    let objects = await objectType.find({ 'author': req.user.id})
    res.render(`view${objectName}s`, {
      data: objects,
      authorized: true,
      title: `Your ${objectName}s`
    })
  }

module.exports = readAllObjects