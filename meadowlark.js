const express = require('express')
const handlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const port = process.env.PORT || 3001
const app = express()
app.use(express.static(__dirname + '/public'))

// configurando Handlebars view engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

//Rotas
app.get('/', handlers.home)
app.get('about', handlers.about)

//pagina 404 personalziada 
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