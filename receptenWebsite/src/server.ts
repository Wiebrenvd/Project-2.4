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
    // throw err;
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
    image: undefined,
    timers: undefined,
    id: undefined
  };

  if (req.headers.authorization != null) {
    let reqToken = '';
    try {
      reqToken = jwt.verify(req.headers.authorization, privateKey);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
      return;
    }

    response.token = createJWT(reqToken.sub);
  }

  connection.query(`
   SELECT rec.id as recipe_id,rec.name as recipe_name, rec.picture as recipe_picture, rec.desc as recipe_desc, ing.id as ingredient_id, ing.name as ingredient_name, rhi.amount as amount FROM recipes as rec
   left JOIN recipes_has_ingredients as rhi on rec.id = rhi.recipes_id
   left join ingredients as ing on rhi.ingredients_id = ing.id
   where rec.id = ${parseInt(req.params.id, 10)};`, (err, data) => {
    if (err) {
      console.log(err);
    }

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
      response.image = data[0].recipe_picture;
      response.id = req.params.id;

      connection.query(`update recipes set clicks=clicks+1 where id = ${data[0].recipe_id}`, (err2, data2) => {
        if (err2) {
          console.log(err2);
        }
      });

      connection.query(`SELECT seconds from timers where timers.recipes_id = ${parseInt(req.params.id, 10)};`, (err3, data3) => {
        if (err3) {
          console.log(err3);
        }
        const timers = [];
        if (data3.length > 0) {
          for (const jsonObj of data3) {
            timers.push(jsonObj.seconds);
          }
        }
        response.timers = timers;
        res.send(JSON.stringify(response));
      });

    }
  });
});

app.get('/zoek', (req, res) => {
  const response = {
    token: undefined,
    recipes: []
  };

  if (req.headers.authorization != null) {

    let reqToken = '';
    try {
      reqToken = jwt.verify(req.headers.authorization, privateKey);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
      return;
    }
    response.token = createJWT(reqToken.sub);
  }

  connection.query(`SELECT * from recipes where name LIKE '%${req.query.searchString}%'`, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {

      for (const jsonObj of data) {
        response.recipes.push(jsonObj);
      }
      res.send(JSON.stringify(response));
    } else {
      res.send(JSON.stringify('empty'));
    }
  });
});


app.post('/register', (req, res) => {

  let body = {
    username: undefined,
    email: undefined,
    password: undefined
  };
  body = req.body;

  const response = {token: undefined};

  connection.query(`INSERT INTO users (username, email, pass) VALUES ('${body.username}' ,'${body.email}', '${body.password}')`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      connection.query(`select id from users where users.username like '${body.username}'`, (error, dataId) => {
        if (error) {
          console.log(error);
        }
        if (dataId.length > 0) {
          response.token = createJWT(dataId[0].id);
          res.send(JSON.stringify(response));
        }
      });


    }

  });
});


app.post('/login', (req, res) => {
  let body = {
    email: undefined,
    password: undefined
  };
  body = req.body;

  const response = {token: undefined};

  connection.query(`select id, username, pass from users where email='${body.email}'`, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      if (body.password === data[0].pass) {
        response.token = createJWT(data[0].id);
        res.send(JSON.stringify(response));
        return;
      }
    } else {
      res.sendStatus(400);
    }


  });
});


app.post('/upload', (req, res) => {


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

  connection.query(`insert into recipes (recipes.name,recipes.desc,recipes.clicks, recipes.picture) values ('${req.body.name}', '${req.body.desc}', 0, '${req.body.image}')`, (err, data) => {
    if (err) {
      console.log(err);
    }

    connection.query(`select last_insert_id() as id from recipes`, (err3, data3) => {
      if (err) {
        console.log(err);
      }


      response.id = data3[0].id;


      let valuesArray = [];
      for (const ingredient of req.body.ingredients) {
        valuesArray.push(`(${response.id}, ${ingredient.id}, ${ingredient.amount})`);
      }
      let queryValues = valuesArray.join(',');


      connection.query(`insert into recipes_has_ingredients values ${queryValues}`, (err4, data4) => {
        if (err) {
          console.log(err);
        }

        valuesArray = [];
        for (const seconds of req.body.timers) {
          valuesArray.push(`(last_insert_id(), ${seconds})`);
        }
        queryValues = valuesArray.join(',');

        connection.query(`insert into timers (recipes_id,seconds) values ${queryValues}`, (err2, data2) => {
          if (err) {
            console.log(err);
          }

          res.send(JSON.stringify(response));
        });
      });
    });
  });
});


app.get('/ingredients', (req, res) => {


  const response = {
    token: undefined,
    ingredients: []
  };

  if (req.headers.authorization != null) {

    let reqToken = '';
    try {
      reqToken = jwt.verify(req.headers.authorization, privateKey);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
      return;
    }
    response.token = createJWT(reqToken.sub);
  }

  connection.query(`select id, name from ingredients order by name ASC`, (err, data) => {
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

app.get('/popular', (req, res) => {


  const response = {
    token: undefined,
    recipes: []
  };


  if (req.headers.authorization != null) {

    let reqToken = '';
    try {
      reqToken = jwt.verify(req.headers.authorization, privateKey);
    } catch (err) {
      console.error(err);
    }
    response.token = createJWT(reqToken.sub);
  }

  connection.query(`SELECT id, name, clicks, picture FROM mydb.recipes order by clicks desc limit 6;`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    if (data.length > 0) {
      for (const jsonObj of data) {
        response.recipes.push(jsonObj);
      }
      res.send(JSON.stringify(response));
    }
  });
});

app.get('/receptofday', (req, res) => {


  const response = {
    token: undefined,
    recipes: []
  };

  if (req.headers.authorization != null) {

    let reqToken = '';
    try {
      reqToken = jwt.verify(req.headers.authorization, privateKey);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
      return;
    }
    response.token = createJWT(reqToken.sub);
  }

  connection.query(`SELECT id FROM mydb.recipes;`, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    if (data.length > 0) {
      for (const jsonObj of data) {
        response.recipes.push(jsonObj);
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
    console.log('JWT Error');
    res.sendStatus(400);
    return;
  }


});

app.put('/boodschappenlijstje', (req, res) => {

  const response = {
    token: undefined
  };

  // CHECK FOR JWT
  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }


  const ingredientList = req.body;
  response.token = createJWT(reqToken.sub);


// Voeg alles toe aan query string
  const valuesArray = [];
  let queryValues = '';

  for (const ingredient of ingredientList) {
    valuesArray.push(`(${reqToken.sub}, (select ing.id from ingredients as ing where ing.name = '${ingredient.name}'), ${ingredient.amount})`);
  }
  queryValues = valuesArray.join(',');

  const query = `insert into shoppinglist (users_id, ingredients_id, amount) VALUES` + queryValues;

  connection.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(JSON.stringify(response));
    }


  });


})
;

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

app.delete('/deleteboodschappenlijstje', (req, res) => {

  let reqToken = '';
  try {
    reqToken = jwt.verify(req.headers.authorization, privateKey);
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
    return;
  }

  const userID = reqToken.sub;

  const response = {
    token: undefined,
    id: undefined
  };
  response.token = createJWT(reqToken.sub);

  connection.query(`DELETE from shoppinglist where users_id = ${userID};`, (err, data) => {
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


