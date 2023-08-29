const express = require('express')
const handlebars = require('express-handlebars')
const fortunes = require('./lib/fortune')

const app = express()

// configure Handlebars view engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')



app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3001

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortunes.getFortune()})
})


// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))