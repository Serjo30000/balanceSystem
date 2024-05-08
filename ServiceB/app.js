const express = require('express')
const { v4: uuidv4} = require('uuid')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const PORT1 = 8081
const PORT2 = 8082
const PORT3 = 8083

app.get('/api/hello', (req, res) => {
    const ID = uuidv4();
    res.send(ID);
});

const server1 = app.listen(PORT1, () => {
    console.log(`Сервер запущен на порту ${PORT1}`)
});

const server2 = app.listen(PORT2, () => {
    console.log(`Сервер запущен на порту ${PORT2}`)
});

const server3 = app.listen(PORT3, () => {
    console.log(`Сервер запущен на порту ${PORT3}`)
});