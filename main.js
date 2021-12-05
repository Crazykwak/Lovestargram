const express = require('express');  // 익스프레스
const bodyParser= require('body-parser');  //데이터를 body로 때겠다.
const app = express();
const http = require('http').createServer(app);
const db = require('./lib/db.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//const wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);


function myAsyncFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('oops'))
      }, 1000)
    })
  }
  
  myAsyncFunction()
    .then(() => {
      // happy path
    })
    .catch((err) => {
      // handle error
    })

http.listen(8080, () => {
    console.log("hello world");
});

// app.get('*', wrapAsync(async (req, res) =>{
//     await new Promise((resolve) => setTimeout(() => resolve(), 50));
//     throw new Error("error hi!")
// }))

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

app.get('/gallery', (req, res) =>{
  db.query('SELECT * FROM upload', (err, result) => {
    console.log(result);
    res.render('gallery.ejs', {data : result});
  })
});

app.get('/write', (req, res) =>{
  res.render('write.ejs');
})