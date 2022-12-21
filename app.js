const express = require('express');

const birds = require('./router/birds')

const app = express();

const port = 3000;

// Метод	            Описание
// res.download()	    Приглашение загрузки файла.
// res.end()	        Завершение процесса ответа.
// res.json()	        Отправка ответа JSON.
// res.jsonp()	      Отправка ответа JSON с поддержкой JSONP.
// res.redirect()   	Перенаправление ответа.
// res.render()	      Вывод шаблона представления.
// res.send()	        Отправка ответа различных типов.
// res.sendFile	      Отправка файла в виде потока октетов.
// res.sendStatus()	  Установка кода состояния ответа и отправка представления в виде строки в качестве тела ответа.

// middleware for this app
app.use(function timeLog(req, res, next) {
  console.log('App Time: ', Date.now());
  next();
})

// middleware for particular endpoint (all methods)
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get('/secret', function (req, res, next) {
  res.send(`<b>SECRET</b> <br><br><pre>${JSON.stringify(req.query)}</pre>`,);
});

// app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname + '/public'))

app.get('/about', function (req, res) {
  res.send('about');
});

app.get('/', (req, res) => {
  res.send('<b>hello world</b>');
});

app.post('/', (req, res) => {
  res.send('Received a POST request at /')
})

app.put('/user', (req, res) => {
  throw new Error('error'); //immitate 500
  // res.send('Received a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Received a DELETE request at /user')
})

// app.get('/ab?cd', function (req, res) {
//   res.send('ab?cd');
// });

// app.get('/ab+cd', function (req, res) {
//   res.send('ab+cd');
// });

// app.get('/ab*cd', function(req, res) {
//   res.send('ab*cd');
// });

// app.get('/example/b', function (req, res, next) {
//   console.log('the response will be sent by the next function ...');
//   next();
// }, function (req, res) {
//   res.send('Hello from B!');
// });

// var cb0 = function (req, res, next) {
//   console.log('CB0');
//   next();
// }

// var cb1 = function (req, res, next) {
//   console.log('CB1');
//   next();
// }

// var cb2 = function (req, res) {
//   res.send('Hello from C!');
// }

// app.get('/example/c', [cb0, cb1, cb2]);

// app.get('/example/d', [cb0, cb1], function (req, res, next) {
//   console.log('the response will be sent by the next function ...');
//   next();
// }, function (req, res) {
//   res.send('Hello from D!');
// });



// handle path with different methods
app.route('/book')
  .get(function (req, res) {
    res.send('get a random book...')
  })
  .post((req, res) => {
    res.send('add a book...')
  })
  .put(function (req, res) {
    res.send('update a book...')
  })

// use router
app.use('/birds', birds)


// app.use('/user/:id', function (req, res, next) {
//   console.log(`request type: ${req.method}`)
//   next()
// })
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
})



// app.get('/user/:id', function (req, res, next) {
//   const { id } = req.params
//   res.send(`USER ${id}`);
// });
// app.get('/user/:id', function (req, res, next) {
//   console.log('ID:', req.params.id);
//   next();
// }, function (req, res, next) {
//   res.send('User Info');
// });
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // sends a regular message
  res.send('regular');
});
// handler for the /user/:id path, which sends a special message
app.get('/user/:id', function (req, res, next) {
  res.send('special');
});




// not found
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// server errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

