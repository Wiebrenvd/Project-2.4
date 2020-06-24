const express = require('express');
const http = require('http');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const privateKey = 'hoi';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});


connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Verbonden met database');
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started!');
});


function createJWT(id, email) {

  const head = {algorithm: 'HS256'};
  const body = {
    sub: id,
    name: email,
    iat: new Date().getTime(),
    exp: 900000
  };
  return jwt.sign(body, privateKey, head);
}

app.get('/login', (req, res) => {
  connection.query(`select id, email, pass from users where email='${req.query.email}'`, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.length > 0) {
      if (req.query.password === data[0].pass) {
        send(res, createJWT(data[0].id, data[0].email));
      }
    }

    sendStatus(res, 401);

  });
});

function checkJWT(req) {
  const token = jwt.verify(req.query.token, privateKey);

  return {id: token.id, email: token.email};
}

function sendStatus(res, status) {
  res.status(status);
}

function send(res, str) {
  res.send(str);
}

app.get('/recept/:id', (req, res) => {
  const response = {
    token: undefined,
    ingredients: {},
    name: undefined,
    desc: undefined,
    picture: undefined

  };
  try {
    if (req.query.token) {
      const fields = checkJWT(req);
      response.token = createJWT(fields.id, fields.email);
    }
  } catch (err) {
    if (err.name !== 'TokenExpiredError') {
      sendStatus(res, 401);
      console.error(err);
    }
  }
  connection.query(`
  SELECT rec.id as recipe_id,rec.name as recipe_name, rec.picture as recipe_picture, rec.desc as recipe_desc, ing.name as ingredient_name, rhi.amount as amount FROM recipes as rec
inner JOIN recipes_has_ingredients as rhi on rec.id = rhi.recipes_id
inner join ingredients as ing on rhi.ingredients_id = ing.id
where rec.id = ${parseInt(req.params.id, 10)};`, (err, data) => {


    if (err) {
      console.log(err);
    }

    if (data.length > 0) {

      const ingredients = [];
      for (const jsonObj of data) {

        ingredients.push({name: jsonObj.ingredient_name, amount: jsonObj.amount});
      }
      response.ingredients = ingredients;
      response.name = data[0].recipe_name;
      response.desc = data[0].recipe_desc;
      response.picture = data[0].recipe_picture;
      send(res, JSON.stringify(response));
    }
  });
});

app.get('/zoek', (req, res) => {
  connection.query(`SELECT * from recipes where name LIKE '%${req.query.searchString}%'`, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      const json = [];
      for (const jsonObj of data) {
        json.push(jsonObj);
      }

      send(res, JSON.stringify(json));
    }
  });
});


let server = app.listen(PORT, '127.0.0.1', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening to http://%s:%s', host, port);
});
// app.use('/',express.static(__dirname + '/'));


