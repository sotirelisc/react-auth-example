const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = require('./router');

const mongoose = require('mongoose');
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0-wwkq9.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Running on', port);