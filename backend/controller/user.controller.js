const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")

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
    let hash = user.password;
    bcrypt.compare(password,hash,function(err,result){
        if(err){
            res.send(err)
        }
        else if(result){
            var token = jwt.sign({email:email},'secret');
            console.log(token);
            res.send({"user":user.userName,"msg":"login successfull","token":token})
        }
        else{
            res.send("Login failed, invalid credentials")
        }
    })
}

module.exports = {register,login}