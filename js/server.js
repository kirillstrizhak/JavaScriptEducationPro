const cors = require('cors');
const express = require('express');
const app = express();

const fs = require('fs');

app.use(cors())
app.use(express.static('.'));

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

app.get('/catalog', (req, res) => {
    fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.listen(2300, () => {
    console.log('server running on local: 2300')
})