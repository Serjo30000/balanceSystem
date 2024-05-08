const express = require('express');
const bodyParser = require('body-parser')
const Balance = require('./balance.js');
const StatusBalance = require('./statusBalance.js');

const app = express();

const servers = ['http://localhost:8081/api/hello', 'http://localhost:8082/api/hello', 'http://localhost:8083/api/hello']

const statusBalance = new StatusBalance()
const balance = new Balance(statusBalance, servers)
const params = { 'x-session-id': '', 'weights' : []}

app.use(bodyParser.json())

//bash post_api_balance_round_robin.sh localhost 3000
app.post('/api/balance/roundRobin', (req, res, next) => {
    balance.funBalance(statusBalance.ROUND_ROBIN, params)

    res.status(200).send('POST request processed successfully');
});

//bash post_api_balance_weight_round_robin.sh localhost 3000
app.post('/api/balance/weightRoundRobin', (req, res, next) => {
    const weights = req.body.weights
    params['weights'] = []

    for (let i = 0; i < weights.length; i++){
        params['weights'].push(parseInt(weights[i], 10))
    }

    if (params['weights'].length != servers.length){
        next(new Error('Длина массива весов не совпадает с количеством серверов'));
    }

    balance.funBalance(statusBalance.WEIGHT_ROUND_ROBIN, params)

    res.status(200).send('POST request processed successfully');
});

//bash post_api_balance_sticky_session.sh localhost 3000 7917433b-3dd6-4d06-b427-41fb367c0c09
app.post('/api/balance/stickySession', (req, res, next) => {
    params['x-session-id'] = req.headers['x-session-id']

    if (params['x-session-id'] === ''){
        next(new Error('Отсутствует x-session-id'));
    }

    balance.funBalance(statusBalance.STICKY_SESSION, params)

    res.status(200).send('POST request processed successfully');
});

//bash post_api_balance_least_connection.sh localhost 3000
app.post('/api/balance/leastConnection', (req, res, next) => {
    balance.funBalance(statusBalance.LEAST_CONNECTION, params)

    res.status(200).send('POST request processed successfully');
});

app.listen(3000, () => {
    console.log('Балансировщик нагрузки запущен на порту 3000');
});