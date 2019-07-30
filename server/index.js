require('dotenv/config')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const middle = require('./middle')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require("./controllers/auth_controller");
const app = express()
app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json())
app.use(express.static('public'))
// app.use(() => {
//   console.log('this is top level middleware')})
app.use(middle)

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
  }))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log('Connected to DB on port ', SERVER_PORT))
  })


app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/current", authCtrl.current);
app.post("/auth/logout", authCtrl.logout);  