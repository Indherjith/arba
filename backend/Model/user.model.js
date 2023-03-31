const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    fullName : {type : String},
    userName:{type:String, required:true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    avatar : {type : String}
})

const UserModel = mongoose.model("user", userSchema)


module.exports = {
    UserModel
}

