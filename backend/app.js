const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movies = require('./routes/movies');
const login = require('./routes/login');

const db = require('./db.js');
const auth = require('./auth.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies', movies);
app.use('/login', login);


app.get('/home', async (req, res) => {
  let user
  try {
    user = auth.verify(req.headers.authorization)
  } catch (e) {

  }

  console.log(user)
  user = user ? await db.findUserById(user.id) : null
  const name = user ? user.name : 'World'

  res.json({greeting: `Hello ${name}`})
});

app.get('/me', auth.ensureAuth(), async (req, res) => {
  const user = await db.findUserById(req.user.id)
  const accessLog = await db.findAccessLog({userId: user.id})
  res.json({user, accessLog})
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body

  const user = await db.findUser({email, password})
  if (!user || !user.id) return res.status(401).json({error: 'Login failure'})

  await db.createAccessLog({userId: user.id})
  const accessToken = auth.signToken(user.id)
  res.json({accessToken})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
