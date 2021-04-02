const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const mongoose = require('mongoose');

require("dotenv").config();
require("./config/database");
require("./config/passport");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const expensesRouter = require('./routes/expenses');
const incomesRouter = require('./routes/incomes');


const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// misc middleware
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// router middleware
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;