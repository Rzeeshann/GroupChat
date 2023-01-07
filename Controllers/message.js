const Message = require('../Models/message')

const User = require('../Models/user')

const Group = require('../Models/group')

exports.sendmsg=(req,res) => {
  let groupid = req.params.id
    const{message} = req.body;
    console.log(req.user);
    if (message == undefined || message.length === 0) {
      return res.status(400).json({ err: "Parameters Missing" });
    } else {
    Message.create({message, userId:req.user.id,groupId:groupid})
    .then((result) => {
      res.status(201).json({ message: "Message Sent", success: true });
    })
     
    .catch((err) => {
      res.status(500).json({ err: "Something went wrong" });
    });
}
}

exports.retrievemsg = (req,res,next) => {
  let groupid = req.params.id
  Message.findAll({where:{groupId:groupid},
        include: [
          {
            model: User,
            required: false,
          },
        ],
      })
      .then(response=>{
        res.status(200).json({success:true,data:response})
      })
      .catch(err=>{
        res.status(500).json({success:false,message:err})
      })
}

