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

app.get('/members/:index', findOne(data.members), showOne)
app.get('/partners/:index', findOne(data.partners), showOne)

////////////////////////////////////

app.delete('/members/:index', findOne(data.members), deleteOne(data.members))
app.delete('/partners/:index', findOne(data.partners), deleteOne(data.partners))


////////////////////////////////////
app.use(errorHandler)
app.listen(port, portListener)
////////////////////////////////////

function getResource(resource) {
    return function (req, res) {
      res.send(data[resource])
    }
}

function findOne(resource) {
    return function (req, res, next) {
        var index = req.params.index
        req.oneObj = resource[index]
        next()
    }
}

function showOne(req, res) {
    res.json(req.oneObj)
}


function deleteOne(resource) {
    return function (req, res) {
      var index = req.params.index
        if  (!req.oneObj){
            res.status(404).send({message:`Nothing found for index ${index}.`})
        } else {
            req.oneObj = resource.splice(index, 1)
            res.status(200).json(req.oneObj)
        }
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
