//multer basic config
const multer = require(('multer'));
const handlebars = require('express-handlebars')
const express = require('express')
const app = express();

exports.storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"uploads/")
    },
    filename: function(req,file,cb){
      cb(null,file.originalname)
    }
  })

// configurando Handlebars view engine
exports.SetUpHandlebars = (app) => {
    app.engine('handlebars', handlebars.engine({
      defaultLayout: 'main',
      helpers: {
        section: function(name,options) {
          if(!this._sections) this._sections = {}
          this._sections[name] = options.fn(this)
          return null
        },
      },
    }))
    app.set('view engine', 'handlebars')
    app.use(express.static(__dirname + '/public'))
    app.use(express.urlencoded({extended:false}))
    app.use(express.json());
  }

  

