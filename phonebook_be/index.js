require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const Person = require('./models/person')

  app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
  })

  app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
      person
      ? res.json(person)
      : res.status(404).json({
        error: "not found 404"
      })
    })
    .catch(error => next(error))
  })

  app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
  })

  app.post("/api/persons", (req, res, next) => {
    const body = req.body
    console.log(body)
    if (!body.name || !body.number) {

        return res.status(400).json({
          error: 'content missing'
        })
    }

    const person = new Person({
      name : body.name,
      number: body.number,
    })
    person.save().then(data => {
      res.json(data)
    })
    .catch(error => next(error))
  })

  app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body
    const upDatedPerson = {
      name: body.name,
      number: body.number,
      id: req.params.id
    }

    Person.findByIdAndUpdate(req.params.id,
      { number: body.number,
        name: body.name,
      })
    .then(() => res.json(upDatedPerson))
    .catch(error=> next(error))
  })


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT ||3001
app.listen(PORT)