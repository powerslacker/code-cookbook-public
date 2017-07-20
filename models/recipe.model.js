const slug = require('slugs')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  content: {
    type: String,
    trim: true,
    required: 'Content is required'
  },
  slug: String,
  author: String
})

// index data for faster searching
recipeSchema.index({
  title:    'text',
  content:  'text'
})

recipeSchema.pre('save', function (next) {
  // if name hasn't changed, don't do anything
  if (!this.isModified('title')) { return next() } 
  // add current time in ms to title to generate unique slugs
  this.slug = slug(`${this.title}-${new Date().getTime()}`)
  next()
})

module.exports = mongoose.model('Recipe', recipeSchema)