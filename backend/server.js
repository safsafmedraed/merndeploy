const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const usersRouter = require('./routes/users');
const forgotpassword = require('./configuration/forgotpassword');
const resetpassword = require('./configuration/resetpassword');
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
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('***database works!!***');
})

app.use(cors());
//body-parser
app.use(express.json());
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





app.use('/users', cors(), usersRouter);
app.use('/forgot', forgotpassword);
app.use('/reset', resetpassword);
app.use('/claims', require('./routes/claims'));

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
})