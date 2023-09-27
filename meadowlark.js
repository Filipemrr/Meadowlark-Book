const express = require('express')
const handlers = require('./lib/handlers')
const multer = require(('multer'))
const multiparty = require('multiparty')
const configurations = require('./configurations')
const port = process.env.PORT || 3001
const app = express()
const weatherMiddlware = require('./lib/middleware/weather')
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')

//Configuration (configurations.js)
const upload = multer({ storage: configurations.storage})
configurations.SetUpHandlebars(app)

app.use(weatherMiddlware)

//Basic Routes
app.get('/', handlers.home)
app.get('/about', handlers.about)


//Newsletter 1 (not recomend)
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

//Newsletter 2(recommended)
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)


//vacation photo feature 1
app.get('/contest/vacation-photo', handlers.VacationPhotoContest)

app.post('/contest/vacation-photo/:year/:month', upload.single("photo"), (req,res) => {
    console.log('File Details', req.file)
    console.log('File fields', req.body)
    handlers.VacationPhotoProcess(req,res,req.body,req.file)
})
app.get('/contest/vacation-photo-thank-you', handlers.VacationPhotoContestThankYourProcess)


//Vacation Photo 2
app.get('/contest/vacation-photo-ajax', handlers.VacationPhotoContestAjax)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.api.vacationPhotoContestError(req, res, err.message)
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})



//Rotas de Erro:
app.use('404', handlers.notFound)
app.use('500', handlers.serverError)


//Abertura da porta
if(require.main === module){
  app.listen(port, () => {
    console.log(`Express started on port ${port}` +
    ';press Command-c to terminate')
  })
}else {
  module.exports = app
}