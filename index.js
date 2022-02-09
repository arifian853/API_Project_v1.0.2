require('dotenv').config();
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const RouteUser     = require('./routes/user');
const mongoose      = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
})

.then(res => {
    console.log('Database connected')
})

.catch(e => {
    console.log('Database error/not connected')
})

app.use(bodyParser.json());
app.use('/', RouteUser);

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server is live on port ${process.env.PORT}`);
})
