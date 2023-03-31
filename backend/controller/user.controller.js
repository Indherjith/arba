const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")

const register = async (req, res) => {
    const {fullName,userName,email, password, avatar} = req.body;

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
    // res.send(req.body)
    const {email, password} = req.body;
    const user = await  UserModel.findOne({email})
    
    const hash = user.password  
    bcrypt.compare(password,hash,function(err,result){
        if(result){
            var token = jwt.sign({email:email},'secret');
            console.log(token);
            res.send({"msg":"Login Successfull","token":token})
        }
        else{
            res.send("Login failed, invalid credentials")
        }
    })
    
}

module.exports = {register,login}