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
    console.log('\x1b[36m','Database connected (MongoDB)')
})

.catch(e => {
    console.log("\x1b[31m",'Database error/not connected')
})

app.use(bodyParser.json());
app.use('/', RouteUser);

app.listen(process.env.PORT, (req,res) => {
    console.log('\x1b[33m',`Server is live on port ${process.env.PORT}`);
})
