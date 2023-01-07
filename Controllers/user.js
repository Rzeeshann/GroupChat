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

    exports.login = (req,res,next) => {
        const{email,password} = req.body
        if(email == undefined || email.length === 0
            || password == undefined || password.length === 0)
            {
                return res.status(400).json({err: 'Enmail Id or Password Missing',success:false})
            }
    User.findAll({where:{email}})
    .then(user => {
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err,result)=>{
                if(err){
                    res.status(400).json({message:'Something Went Wrong'})
                }
                if(result === true){
                    res.status(200).json({message:'Successfully logged in', success:true, token:generateToken(user[0].id),user:user})
                } 
                
                else {
                    res.status(400).json({message: 'Password did not match', success:false})
                }
            })
        } else {
            res.status(403).json({message:'User does not exist'})
        }
    })        
.catch(err=> {
    res.status(500).json({message:err, success:false})
})
    }