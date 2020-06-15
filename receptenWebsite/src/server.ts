const express = require('express');
const http = require("http");
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var serveStatic = require('serve-static');
const events = require('./receptDelen.js');

//app.use(express.static("C:\Users\Ramon\IdeaProjects\Project-2.4", 'receptenWebsite'));

//const appFolder = '../receptenWebsite/src/app/home-page'
//app.get('*.*',express.static(appFolder));

//app.all('*', function (req, res) {
  //res.status(200).sendFile(`/home-page.component.ts`, {root: appFolder});
//});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Verbonden met database')
})


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(events(connection));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started!')
})



app.get('/test', (req, res) => {
  connection.query('select * from ingredients', function (err, data) {
    if (err) console.log(err)
    res.send(data)
    console.log(data)
  })//res.send('Hello World!'))
})

app.get('/test2', (req, res) => {
  connection.query('select * from recipe', function (err, data) {
    if (err) console.log(err)
    res.send(data)
    console.log(data)
  })//res.send('Hello World!'))
})



app.route('/recept').post((req, res) => {
  res.send(201, req.body)
})

app.route('/api/recept/:name').get((req, res) => {
  const requestedRecipeName = req.params['recipeName']
  res.send({ name: requestedRecipeName })
  res.redirect('https://google.com')
})

app.route('/recept/:name').put((req, res) => {
  res.send(200, req.body)
})

app.route('/recept/:name').delete((req, res) => {
  res.sendStatus(204)
})








var server = app.listen(PORT, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Listening to http://%s:%s", host, port)
});
//app.use('/',express.static(__dirname + '/'));


