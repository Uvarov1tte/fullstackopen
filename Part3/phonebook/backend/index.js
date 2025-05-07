require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')
const mongoose = require('mongoose')

app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (req, res) => {
    let persons
    await Person.find({}).then(person => {
        persons = person
    })
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date(Date.now()).toString()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).redirect('/api/persons')
        })
        .catch(error => next(error))
})

app.post('/api/persons', async (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'invalid person info'
        })
    }

    // if (await isPersonExisted(body.name)) {
    //     Person.findOne({ name: body.name })
    //         .then(person => res.redirect(`/api/persons/${person.id}`))
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(result => {
        res.json(result)
    })
})

async function isPersonExisted(name) {
    if (await Person.findOne({ name: name })) {
        return true
    }
    return false
}

app.put('/api/persons/:id', (req, res, next) => {
    const { name: name, number: number } = req.body

    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                res.json(updatedPerson)
            })
        })
        .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
