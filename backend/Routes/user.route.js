const {Router} = require("express");
const {register,login,ResetLink}  = require("../controller/user.controller")
const userRouter = Router();
const {authentication} = require("../middleware/authentification")

userRouter.get("/",(req,res)=>{
    res.send("Hey people, THERE YOU WILL FIND ALL THE ROUTES FOR LIFESTYLE WEBSITE.");
});

userRouter.post("/signup",register);

userRouter.post("/login",login);

userRouter.post('/Resetpassword',ResetLink)

module.exports = {
    userRouter
}