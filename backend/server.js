const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const usersRouter = require('./routes/users');
const subjectRouter = require('./routes/Subjects');
const forgotpassword = require('./configuration/forgotpassword');
const QuestionRouter = require('./routes/Questions');
const QuizzRouter = require('./routes/Quizzs');
const cl = require('./routes/Classes');
const app = express();
//passport config
require('./passport')(passport);

require('dotenv').config();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
const port = process.env.port || 5000;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('***database works!!***');
})


app.use(express.json({ extended: false }));
//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//connect flash
app.use(flash());
//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('succes_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})


app.use('/subjects', subjectRouter);
app.use('/users', usersRouter);
app.use('/forgot', forgotpassword);
app.use('/api/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/questions', QuestionRouter);
app.use('/quizz', QuizzRouter);
app.use('/class', cl);
app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
})
