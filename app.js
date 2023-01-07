const express = require('express')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const app = express()
const cors = require('cors')
const sequelize = require('./Util/database')


const userRoute = require('./Routes/user')
const messageRoute = require('./Routes/message')
const groupRoute = require('./Routes/group')
const adminRoute = require('./Routes/admin')

app.use(cors())
app.use(bodyparser.json())
app.use(userRoute)
app.use(messageRoute)
app.use(groupRoute)
app.use(adminRoute)

// const userModel = require('./Models/user')
const User = require('./Models/user');
const Message = require('./Models/message')
const Group = require('./Models/group')
const userGroup = require('./Models/user-group');


User.hasMany(Message);
User.hasMany(userGroup);
Group.hasMany(Message);
Group.hasMany(userGroup);
userGroup.belongsTo(User);
userGroup.belongsTo(Group)
Message.belongsTo(User);
Message.belongsTo(Group);
sequelize.sync()

.then(response => {
    app.listen(3000)
})
.catch(err => {
    console.log(err);
})


