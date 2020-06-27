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
    console.error('Start de database aub');
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


function createJWT(id) {

  const head = {algorithm: 'HS256'};
  const body = {
    sub: undefined,
    iat: undefined,
    exp: undefined
  };
  body.sub = id;
  body.iat = Math.round(new Date().getTime() / 1000);
  const date = new Date();
  date.setTime(date.getTime() + 900000);
  body.exp = Math.round(date.getTime() / 1000);
  return jwt.sign(body, privateKey, head);
}



app.get('/recept/:id', (req, res) => {

  const response = {
    token: undefined,
    ingredients: {},
    name: undefined,
    desc: undefined,
    picture: undefined

  };

  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }
  response.token = createJWT(reqToken.sub);

  connection.query(`
   SELECT rec.id as recipe_id,rec.name as recipe_name, rec.picture as recipe_picture, rec.desc as recipe_desc, ing.id as ingredient_id, ing.name as ingredient_name, rhi.amount as amount FROM recipes as rec
 inner JOIN recipes_has_ingredients as rhi on rec.id = rhi.recipes_id
 inner join ingredients as ing on rhi.ingredients_id = ing.id
 where rec.id = ${parseInt(req.params.id, 10)};`, (err, data) => {

    if (err) {
      console.log(err);
    }
    console.log(data);
    if (data.length > 0) {
      const ingredients = [];
      for (const jsonObj of data) {
        ingredients.push({
          id: jsonObj.ingredient_id,
          name: jsonObj.ingredient_name,
          amount: jsonObj.amount
        });
      }

      response.ingredients = ingredients;
      response.name = data[0].recipe_name;
      response.desc = data[0].recipe_desc;
      response.picture = data[0].recipe_picture;
      res.send(JSON.stringify(response));
    }
  });
});

app.get('/zoek', (req, res) => {
  const response = {
    token: undefined,
    recipes: []
  };

  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }
  response.token = createJWT(reqToken.sub);

  connection.query(`SELECT * from recipes where name LIKE '%${req.query.searchString}%'`, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {

      for (const jsonObj of data) {
        response.recipes.push(jsonObj);
      }
      res.send(JSON.stringify(response));
    }else{
      res.send(JSON.stringify("empty"));
    }
  });
});


app.post('/register', (req, res) => {

  const requestParams = {
    username: undefined,
    email: undefined,
    password: undefined
  };
  for (const httpMap of req.body.params.updates) {
    switch (httpMap.param) {
      case 'username':
        requestParams.username = httpMap.value;
        break;
      case 'email':
        requestParams.email = httpMap.value;
        break;
      case 'password':
        requestParams.password = httpMap.value;
        break;
    }
  }


  connection.query(`INSERT INTO users (username, email, pass) VALUES ('${requestParams.username}' ,'${requestParams.email}', '${requestParams.password}')`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      connection.query(`select id from users where users.username like '${requestParams.username}'`, (error, dataId) => {
        if (error) {
          console.log(error);
        }
        if (dataId.length > 0) {
          const id = dataId[0].id;
          const response = createJWT(id);
          res.send(JSON.stringify(response));
        }
      });


    }

  });
});


app.post('/login', (req, res) => {

  const updates = {
    email: undefined,
    password: undefined
  };

  for (const update of req.body.params.updates) {
    switch (update.param) {
      case 'email':
        updates.email = update.value;
        break;
      case 'password':
        updates.password = update.value;
        break;
    }
  }


  connection.query(`select id, username, pass from users where email='${updates.email}'`, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      if (updates.password === data[0].pass) {

        res.send(JSON.stringify(createJWT(data[0].id)));
        return;
      }
    } else {
      res.sendStatus(401);
    }



  });
});


app.get('/ingredients', (req, res) => {

  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }


  const response = {
    token: undefined,
    ingredients: []
  };
  response.token = createJWT(reqToken.sub);

  connection.query(`select name from ingredients`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    if (data.length > 0) {
      for (const jsonObj of data) {
        response.ingredients.push(jsonObj);
      }


      res.send(JSON.stringify(response));

    }

  });
});


app.get('/verify', (req, res) => {

  const response = {
    token: undefined
  };

  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
    response.token = createJWT(reqToken.sub);
    res.send(JSON.stringify(response));
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
    return;
  }




});

app.put('/boodschappenlijstje', (req, res) => {
  const params = {
    ingredientAmount: undefined,
    ingredientName: undefined
  };
  for (const updates of req.body.params.updates) {
    switch (updates.param) {
      case 'ingredientName':
        params.ingredientName = updates.value;
        break;
      case 'ingredientAmount':
        params.ingredientAmount = updates.value;
        break;
    }
  }
  let reqToken = '';
  try {

    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }

  const response = {
    token: undefined,
    ingredientId: undefined,
    ingredientName: undefined,
    ingredientAmount: undefined
  };

  if (params.ingredientAmount === '') {
    params.ingredientAmount = 1;
  }

  response.token = createJWT(reqToken.sub);

  response.ingredientName = params.ingredientName;
  response.ingredientAmount = params.ingredientAmount;


  const query = `insert into shoppinglist (users_id, ingredients_id, amount) VALUES (${reqToken.sub}, (select ing.id from ingredients as ing where ing.name = '${params.ingredientName}'), ${params.ingredientAmount})`;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      connection.query(`select last_insert_id() as id from shoppinglist`, (error, dataId) => {
        if (error) {
          console.log(error);
        }
        if (dataId.length > 0) {
          response.ingredientId = dataId[0].id;
          console.log(dataId[0]);
          res.send(JSON.stringify(response));
        }
      });
    }

  });
});

app.get('/boodschappenlijstje', (req, res) => {

  let reqToken = '';
  try {

    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }


  const response = {
    token: undefined,
    ingredients: []
  };
  response.token = createJWT(reqToken.sub);

  connection.query(`SELECT shoppinglist.id, ingredients.name, shoppinglist.amount FROM mydb.users
join shoppinglist on users.id = shoppinglist.users_id
join ingredients on shoppinglist.ingredients_id = ingredients.id
where users.id = ${reqToken.sub}`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    if (data.length > 0) {
      for (const jsonObj of data) {
        response.ingredients.push(jsonObj);
      }


      res.send(JSON.stringify(response));

    }

  });
});

app.delete('/boodschappenlijstje/:id', (req, res) => {


  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }


  const response = {
    token: undefined,
    id: undefined
  };
  response.token = createJWT(reqToken.sub);
  response.id = req.params.id;

  connection.query(`DELETE from shoppinglist where id = ${req.params.id};`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    res.send(JSON.stringify(response));


  });
});

let server = app.listen(PORT, '127.0.0.1', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening to http://%s:%s', host, port);
});


