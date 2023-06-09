const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const {fullName,userName,email, password, avatar} = req.body;

    const userexits = await UserModel.findOne({email})
    
    if(userexits != null){
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
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(user === null){
        res.send({"msg":"User Not Exit!"})
    }
    else{
        const hash = user.password
        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                res.send({"msg":"Something went wrong, plz try again later"})
            }
            if(result){
                const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
                res.json({msg : "Login successfull", token,user})
            }
            else{
                res.send({"msg":"Invalid credentials, plz signup if you haven't"})
            }
        });
    }
}

const ResetLink = async(req,res)=>{
    let {email} = req.body; 
    let data =await UserModel.findOne({email})
    if(data == null){
        res.send({"msg":"User Not Exits!"})
    }
    else{
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
}

const update = async(req,res)=>{
    let {_id,password}=(req.body);
    let user = await UserModel.findOne({_id});
    let fullName = req.body.fullName || user.fullName;
    let userName = req.body.userName || user.userName;
    let avatar = req.body.avatar || user.avatar;
    if(req.body.password){
        bcrypt.hash(req.body.password, 5, async function(err, hash) {
            if(err){
                res.send("Something went wrong, plz try again later")
            }
            else{
                const updates = {fullName,userName,password:hash,avatar}
                // console.log(updates);
                try{
                    UserModel.updateOne({
                        _id
                    }, {
                        $set: {
                            "fullName": fullName,
                            "userName": userName,
                            "password": hash,
                            "avatar":avatar
                        }
                    })
                    res.send({"msg":"Profile Updated Successfully"})
                }
                catch(e){
                    res.send("Update failed")
                }
                
            }
        })
    }
    else{
        const updates = {fullName,userName,password,avatar}
        try{
            UserModel.updateOne({
                _id
            }, {
                $set: {
                    "fullName": fullName,
                    "userName": userName,
                    "password": password,
                    "avatar":avatar
                }
            })
            res.send({"msg":"Profile Updated Successfully"})
        }
        catch(e){
            res.send("Update failed")
        }
    }
    
}

module.exports = {register,login,ResetLink,update}