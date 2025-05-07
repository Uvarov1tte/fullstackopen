require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')
const mongoose = require('mongoose')
const { Person } = require('./mongo.js')

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
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

})

// app.delete('/api/persons/:id', (req, res) => {
//     const id = req.params.id
//     persons = persons.filter(person => person.id !== id)

//     res.status(204).end()
// })

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'invalid person info'
        })
    }

    // if (isPersonExisted(body.name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

   const person = new Person({
		name: process.argv[4],
		number: process.argv[5]
	})

	person.save().then(result => {
		res.json(result)
	})
})

// function isPersonExisted(name) {
//     if (persons.filter(person => person.name == name).length > 0) {
//         return true
//     }
//     return false
// }

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})