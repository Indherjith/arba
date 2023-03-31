const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {UserModel} = require("../Model/user.model")

const register = async (req, res) => {
    const {fullName,userrName,email, password, avatar} = req.body;

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
    // res.send(req.body)
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    // res.send(user)
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        if(result){
            const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.send({message : "Login successfull", token})
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    });
    
}

module.exports = {register,login}