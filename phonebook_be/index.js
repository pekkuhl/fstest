const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(( person => Number(person.id))))
    : 0
    return String(maxId + 1)
}

let persons = [
    {
      "id": "1",
      "name": "Kissa",
      "number": "123456789"
    },
    {
      "id": "2",
      "name": "Kokkeli",
      "number": "353454"
    },
    {
      "id": "3",
      "name": "Testataan",
      "number": "4546546456"
    },
    {
      "id": "4",
      "name": "Peikko Pekkala",
      "number": "0050505"
    }
  ]

  app.get("/api/persons", (req, res) => {
    res.json(persons)
  })

  app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
  })

  app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

  app.post("/api/persons", (req, res) => {
    const body = req.body
    console.log(body)
    if (!body.name || !body.number) {

        return res.status(404).end()
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
  })




const PORT = process.env.PORT ||3001
app.listen(PORT)