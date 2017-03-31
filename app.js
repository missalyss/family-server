'use strict'

const bodyParser = require('body-parser');
const express = require('express')
const exphbs = require('express-handlebars');
const morgan = require('morgan')
const path = require('path');
const data = require('./data')

const app = express()
const port = process.env.PORT || 3003
////////////////////////////////////
app.use(morgan('dev'))
app.use(bodyParser.json())
app.disable('x-powered-by')
////////////////////////////////////

app.get('/members', getResource('members'))
app.get('/partners', getResource('partners'))

////////////////////////////////////

app.get('/members/:index', getResourceIndex(data.members))
app.get('/partners/:index', getResourceIndex(data.partners))

////////////////////////////////////


////////////////////////////////////
app.use(errorHandler)
app.listen(port, portListener)
////////////////////////////////////

function getResource(resource) {
    return function (req, res) {
      res.send(data[resource])
    }
}

function getResourceIndex(resource) {
    return function (req, res) {
      var index = req.params.index
      req.oneObj = resource[index]
      res.json(req.oneObj)
    }
}

function deleteMe(req, res) {
    var index = req.params.index
    var trainSolo = trainsResource[index]
    if  (!trainSolo){
      res.status(404).send({message:`No train found for index ${index}.`})
    } else {
      trainSolo = trainsResource.splice(index, 1)
      res.status(210).send(trainSolo)
    }
}

////////////////////////////////////
function errorHandler(err, req, res, next) {
    res.status(err.status).json(err)
    next()
}

function portListener() {
  console.log(`Now listening on localhost:${port} for 'family-server'`);
}
