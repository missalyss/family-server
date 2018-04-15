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

// app.get('/', getResource('data')) //I was gonna see if I could get all the information at once but it's not really worth my time to troubleshoot

app.get('/members', getResource(members))
app.get('/partners', getResource(partners))

app.get('/members/:index', findOne(data.members), showOne)
app.get('/partners/:index', findOne(data.partners), showOne)

////////////////////////////////////

app.delete('/members/:index', findOne(data.members), deleteOne(data.members))
app.delete('/partners/:index', findOne(data.partners), deleteOne(data.partners))

////////////////////////////////////

app.post('/members', createOne(data.members))
app.post('/partners', createOne(data.partners))

////////////////////////////////////

// app.patch('/members/:index', findOne(data.members), patchOne(data.members))
// app.patch('/partners/:index', findOne(data.partners), patchOne(data.partners))

////////////////////////////////////

app.put('./members/:index', findOne(data.members), putOne(data.members) )

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
        console.log(req.oneObj)
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

function createOne(resource) {
    return function (req, res) {
        var onePost = req.body
        resource.push(onePost)
        res.status(201).json(onePost)
    }
}

function putOne(resource) {
    return function (req, res) {
        var index = req.params.index
        // if  (!req.oneObj){
        //     res.status(404).send({message:`Nothing found for index ${index}.`})
        // } else {
        console.log(req.oneObj);
            req.oneObj = resource.splice(index, 1)
            // res.status(200).json(req.oneObj)
            var onePost = req.body
            // resource.push(onePost)
            console.log(onePost);
            res.status(201).json(onePost)
        // }
    }
}




// function patchOne(resource) {
//     return function (req, res) {
//         var onePost = req.body
//         resource.push(onePost)
//         res.status(201).json(onePost)
//     }
// }

////////////////////////////////////
function errorHandler(err, req, res, next) {
    res.status(err.status).json(err)
    next()
}

function portListener() {
  console.log(`Now listening on localhost:${port} for 'family-server'`);
}
