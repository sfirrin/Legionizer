const mongoose = require('mongoose')

const creditsSchema = mongoose.Schema({
    id: String,
    cards: [{ title: String, names: [String] }]
})

const Credits = mongoose.model('Credits', creditsSchema)
module.exports = Credits