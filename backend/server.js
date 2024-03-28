const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');

app.use('/profile', profileRouter);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../speakeasyapp/src/components', 'MainPage.js'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
