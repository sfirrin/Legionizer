const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const csp = require('helmet-csp')
// const crypto = require('crypto')
// const Credits = require('./models').Credits
require('dotenv')

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds155150.mlab.com:55150/legionizer`)
const db = mongoose.connection
const app = express();
app.use(csp({
    directives: {
        fontSrc: ["'self'", 'data:']
    }
}))


const creditsSchema = mongoose.Schema({
    id: String,
    cards: [{ title: String, names: [String] }]
})

const Credits = mongoose.model('Credits', creditsSchema)

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Setup bodyParser
app.use(bodyParser.json())


// Serve static assets
app.use(express.static('build'));

app.get('/credits/:id', (req, res) => {
    Credits.findOne({ id: req.params.id }, 'cards', (err, credits) => {
        if (err) return err.message
        console.log(credits)
        res.end(JSON.stringify(credits))
    })
})

app.post('/credits', (req, res) => {
    // const hash = crypto.randomBytes(20).toString('hex')
    if (req.body.id.length > 25
        || req.body.cards.length > 100 
        || JSON.stringify(req.body).length > 20000) {
            res.status(400).send('Trying to post too much')
        }
    const credits = new Credits({id: req.body.id, cards: req.body.cards })
    credits.save()
    console.log(req.body)
    res.end('logged the post')
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;