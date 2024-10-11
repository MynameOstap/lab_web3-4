import { getAllAnimals, addAnimal, deleteAnimal, updateAnimal } from './database.js'
import express from 'express'
const app = express()
const port = 3000

app.use(express.json())

app.get('/animals', async (req, res) => {
    const animals = await getAllAnimals()
    res.status(200).send(animals)
})

app.post('/', async (req, res) => {
    const body = req.body

    if (typeof body === 'object' && body !== null && is_animal_valid(body)) {
        const success = await addAnimal(body)
        if (success) {
            res.status(201).send()
        } else {
            res.status(400).send()
        }

    } else {
        res.status(401).send()
    }


    console.log(req.body);
})

app.delete('/animals/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(401).send()
    } else {
        const success = await deleteAnimal(id)
        if (success) {
            res.status(200).send()
        } else {
            res.status(401).send()
        }

    }

})

app.put('/animals/:id', async (req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    if (Number.isNaN(id) || typeof body !== 'object' || body === null || !is_animal_valid(body)) {
        res.status(401).send()
    } else {
        const success = await updateAnimal(id, body)
        if (success) {
            res.status(200).send()
        } else {
            res.status(401).send()
        }
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