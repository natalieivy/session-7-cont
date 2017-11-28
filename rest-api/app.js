const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const mongoUri = 'mongodb://deverell:dd2345@ds113746.mlab.com:13746/pirates';
mongoose.connect(mongoUri);

// make sure this line always appears before any routes
app.use(bodyParser.json());
app.use(express.static('static'))

const pirateModels = require('./src/pirate.model'); 

const routes = require('./src/pirate.routes');
const appRoutes = routes(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3001);
console.log('Server running at http://localhost:3001/');














