const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/Post')
const forgotpassword = require('./configuration/forgotpassword');
const QuestionRouter = require('./routes/Questions');
const QuizzRouter = require('./routes/Quizzs');
const cl = require('./routes/Classes');
const app = express();
const googleauth = require('./routes/googleauth');
const chat = require('./routes/chat')
const subjectRouter = require('./routes/Subjects');
const presence = require('./routes/Presences');
const Lesson = require('./routes/Lesson');
const Module = require('./routes/Modules');
const path = require('path');


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
const PORT = process.env.PORT || 5000;

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



app.use('/chat', chat)
app.use('/post', postRouter)





app.use('/users', usersRouter);
app.use('/forgot', forgotpassword);
app.use('/', googleauth);
app.use('/api/auth', require('./routes/auth'));
app.use('/claims', require('./routes/claims'));
app.use('/profile', require('./routes/profile'));
app.use('/questions', QuestionRouter);
app.use('/quizz', QuizzRouter);
app.use('/class', cl);
app.use('/Lesson', Lesson);
app.use('/Module', Module);
app.use('/subjects', subjectRouter);
app.use('/users', usersRouter);
app.use('/forgot', forgotpassword);
app.use('/api/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/class', cl);
app.use('/presence', presence);
//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', '../build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT} `);
})
