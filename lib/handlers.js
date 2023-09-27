const express = require('express')
const fortune = require('./fortune')
exports.api = {}

exports.home = (req,res) => res.render('home')

exports.about = (req,res) => 
    res.render('about', {fortune: fortune.getFortune()})

exports.notFound = (req,res) => res.render('404')
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-disable no-unused-vars */


// NEWSLETTER 1 
exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes gere'})
}

exports.newsletterSignupProcess = (req,res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.render('newsletter-signup-thank-you')
}

exports.newsletterSignupThankYou = (req,res) => {
    res.render('newsletter-signup-thank-you')
}

// NEWSLETTER 2 
exports.newsletter = (req,res) => {
    // we will learn about CSRF later...for now, we just
    res.render('newsletter', {csrf: 'CSRF token goes there'})
}
exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
  }



  // Vacation Photo 1
exports.VacationPhotoContest = (req,res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth()})
}


exports.VacationPhotoProcess = (req,res,fields,files) => {
    console.log('field data:', fields)
    console.log('files', files)
    res.render('contest/vacation-photo-thank-you')
}

//Vacation photo 2
  // exports.api.VacationPhotoContesProcesstAjax = (req,res,fields,files) => {
      // console.log('field data: '  + req.body._csrf)
      // console.log('Name (from visible form field): ' + req.body.fields)
  // }

exports.VacationPhotoContestAjax = (req,res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth()})
}
exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
  }
  exports.api.vacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message })
  }
  

exports.VacationPhotoContestThankYourProcess = (req,res) => {
    res.render('/contest/vacation-photo-ajax')
}


//Vacation Photo 2

