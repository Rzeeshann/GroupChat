const User = require('../Models/user')

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken");

const token = require('jsonwebtoken')

exports.signup = (req,res,next)=>{
    const {name,email,password} = req.body
    console.log(req);
    if(name == undefined || name.length === 0
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err: 'Parameters Missing'})
        }

        User.findAll()
        .then(users=>{ 
                bcrypt.hash(password, 10 , async(err,hash)=>{
                    console.log(err)
                    await User.create({name,email,password:hash})
                    .then(res.status(201).json({message:'User Successfully Created'}))
                    .catch(err=>res.status(500).json({message:'Something went wrong'}))
                })  
        })   
        }

        function generateToken(id) {
            return token.sign({userId:id}, 'secretkey')
            }