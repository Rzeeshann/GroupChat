const express = require('express')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express()
const cors = require('cors')
const sequelize = require('./Util/database')
const userRoute = require('./Routes/user')

app.use(cors())
app.use(bodyparser.json())
app.use(userRoute)

// const userModel = require('./Models/user')
const User = require('./Models/user');


sequelize.sync()
.then(response => {
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})


