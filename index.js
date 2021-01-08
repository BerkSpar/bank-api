const express = require('express')
const database = require('./src/database/connection')
const router = require('./src/routes/routes')

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 4000, () => { })

app.get('/', (request, response) => {
    response.json({ message: 'Oxente! Venha usar o Oxente Bank e lucrar como nunca antes!' })
})