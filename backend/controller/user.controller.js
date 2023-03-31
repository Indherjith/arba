const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const {fullName,userName,email, password, avatar} = req.body;

    const userexits = await UserModel.findOne({email})
    console.log(userexits);
    //TODO
    if(userexits?.email){
        res.send({"msg" : "Try loggin in, already exist"})
    } else{

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.send("Something went wrong, plz try again later")
            }
            const user = new UserModel({
                userName,
                fullName,
                email,
                password : hash,
                avatar
            })
            try{
                await user.save()
                res.send({msg : "Signup successfull"})
            }
            catch(err){
                console.log(err)
                res.send("Something went wrong, plz try again")
            }
           
        });
    }

}

const login =  async(req, res) => {
    let {email,password} = req.body;
    let user = await UserModel.findOne({email})
    if(user == null){
        res.send({"msg":"User not exit"})
    }
    else{
        let hash = user.password;
        bcrypt.compare(password,hash,function(err,result){
            if(result){
                var token = jwt.sign({email:email},'secret');
                console.log(token);
                res.send({"user":user,"msg":"login successfull","token":token})
            }
            else{
                res.send({"msg":"Login failed, invalid credentials"})
            }
        })
    }
}

const ResetLink = async(req,res)=>{
    let {email} = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'indher26@gmail.com',
          pass: 'dgwawnrtaqtlvcji'
        }
      });
      
      var mailOptions = {
        from: 'indher26@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send({"msg":"Reset Link is send to your mail_Id."})
        }
      });
}

module.exports = {register,login,ResetLink}