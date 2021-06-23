const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
//const logger = require('./middleware/logger');
//const user = require('./User');
//const path = require('path');
const cors = require('cors');

//const members = require('./Members');
dotenv.config();

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//Import Routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

const usersRoute = require('./routes/api/users');
const bjGameRoute = require('./routes/api/bjGame');


//dotenv.config();

// //Connect to DB
// mongoose.connect(
//   process.env.DB_CONNECT,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   () => console.log("connected to db!")
// );

// app.get('/', (req, res) => {
//   res.send('<h1>hello world</h1>')
// });


mongoose.connect(
  "mongodb://127.0.0.1:27017/bj_game",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db!")
);

//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))






// Homepage Route
app.get('/', (req, res) =>
  res.render('users', {
    title: 'User list',
    // user
  })
);

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

app.use("/api/users", usersRoute);


app.use("/api/bjGame", bjGameRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Up and running ${PORT}`));
