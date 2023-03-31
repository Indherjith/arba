const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const {fullName, userName, email, password, avatar} = req.body;

    const userexits = await UserModel.findOne({email})
    //TODO
    if(userexits?.email){
        res.send({"msg" : "Try loggin in, already exist"})
    } else{

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.send("Something went wrong, plz try again later")
            }
            const user = new UserModel({
                fullName,
                userName,
                email,
                password : hash,
                avatar
            })
            try{
                await user.save()
                res.json({msg : "Signup successfull"})
            }
            catch(err){
                console.log(err)
                res.send("Something went wrong, plz try again")
            }
           
        });
    }

}

const login =  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        if(result){
            const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.json({message : "Login successfull", token})
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    });
    
}

const forgot = async(req,res)=>{
    const {email} = req.body;
    try{
        const client = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "indher26@gmail.com",
                pass: "tsxhfmwplbrqxuat"
            }
        });
        
        client.sendMail(
            {
                from: "indher26@gmail.com",
                to: email,
                subject: "Reset Password Link",
                text: "Hello, Unnakellam reset link anupamudiyadhu poda"
            }
        )
        res.send("Reset password link is sended to your respected mail id.")
    }
    catch(err){
        res.send(err);
    }
    
}

const update = async(req,res)=>{
    const {password} = req.body;
    let {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    const userexits = await UserModel.findOne({_id:userId})
    let fullName = req.body.fullName || userexits.fullName;
    let avatar = req.body.avatar || userexits.avatar;
    if(password == undefined){
        try{
            await UserModel.updateOne(userexits,{$set:{
                fullName,
                password:userexits.password,
                avatar
                }})
                res.send("successfully updated")
        }
        catch(err){
            res.send(err)
        }
    }
    else{
    bcrypt.hash(password, 5, async function(err, hash) {   
        if(err){
            res.send("try again!")
        } 
            else{try{
                await UserModel.updateOne(userexits,{$set:{
                    fullName,
                    password:hash,
                    avatar
                    }})
                res.send("successfully updated")
            }
            catch(err){
                res.send(err)
            }}
        
        });
    }
    
}



module.exports = {register,login,forgot, update};