const express = require('express');
//we are going to use express to create the api

//Defining various subRouters
const connectDB = require('./config/db');
const usersRouter = require('./routes/apis/users');
const profilesRouter = require('./routes/apis/profile');
const authRouter = require('./routes/apis/auth');
const postsRouter = require('./routes/apis/posts');

const app = express();

// we have made all the files regarding to the router now we want to make a route to the all the routes

connectDB(); // is this function even working

app.get('/', (req, res) => {
	res.send('API up and running');
});

//use all the routers

//Use the bodyParser => express.json({ extended: true })
app.use(express.json({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// using all the routers
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening at PORT: ${5000}`));
