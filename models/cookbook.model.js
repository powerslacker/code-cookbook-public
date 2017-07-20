const slug = require('slugs')
const mongoose = require('mongoose'),
Schema = mongoose.Schema
mongoose.Promise = global.Promise

const cookbookSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String,
  },
  recipes: [{ type : Schema.Types.ObjectId, ref: 'Recipie' }],
  slug: String,
  title: {
    required: 'Title is required',
    type: String,
    trim: true,
  },
})

cookbookSchema.pre('save', function (next) {
  // if name hasn't changed, don't do anything
  if (!this.isModified('title')) { return next() } 
  // add current time in ms to title to generate unique slugs
  this.slug = slug(`${this.title}-${new Date().getTime()}`)
  next()
})

module.exports = mongoose.model('Cookbook', cookbookSchema)
