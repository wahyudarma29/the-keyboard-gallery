const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const router = require('./routers');
// const passport = require('passport');

const app = express()

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(flash());
app.use(router)

app.listen(3000, () => {
  console.log("Running on localhost:3000");
});