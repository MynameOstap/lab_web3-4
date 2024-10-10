const express = require('express')
const app = express()
const port = 3000
const animals = []
app.use(express.json())

app.get('/animals', (req, res) => {
    res.status(200).send(animals)
})

app.post('/', (req, res) => {
    const body = req.body

    if (typeof body === 'object' && body !== null && is_animal_valid(body)) {
        animals.push(body)
        res.status(201).send()
    } else {
        res.status(401).send()
    }
   

    console.log(req.body);
})

app.delete('/animals/:id', (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id) || id < 0 || id >= animals.length) {
        res.status(401).send()
    } else {
        animals.splice(id, 1)
        res.status(200).send()
    }

})

app.put('/animals/:id', (req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    if (Number.isNaN(id) || id < 0 || id >= animals.length || typeof body !== 'object' || body === null ||!is_animal_valid(body)) {
        res.status(401).send()
    } else {
        animals[id] = body
        res.status(200).send()
    }
  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


function is_animal_valid(animal) {
    if (!animal.name || !animal.description || Number.isNaN(animal.daily_expense)) {
        return false;
    }
    return true;
}