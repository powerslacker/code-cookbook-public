const mongoose = require('mongoose')

function dbConnect (db) {
    mongoose.connect(db)
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', (err) => {
        console.error(`Ya dun goofed. ${err.message}`)
    })
}

module.exports = dbConnect