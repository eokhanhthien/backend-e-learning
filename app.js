// app.js ---> routers ---> controllers
// npm init
// 1 -> app.js
const express = require('express') //1
const app = express()  //1
const appRoute = require('./routes') // 5
const cors = require('cors')
// 1.1 --> nodemon
const mongoose = require('mongoose'); //2
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://thien:thien@cluster0.m28vgln.mongodb.net/test') //2
  .then(() => console.log('Connected!'));
var bodyParser = require('body-parser')  //3 





// test port
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(bodyParser.json()) // 4
app.use(cors())
app.use(appRoute) // 5.1

app.listen(3000, () => {
  console.log("server is runing");
})