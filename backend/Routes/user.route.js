const {Router} = require("express");
const {register,login,ResetLink, update}  = require("../controller/user.controller")
const userRouter = Router();
const {authentication} = require("../middleware/authentification")

userRouter.get("/",(req,res)=>{
    res.send("Hey people, THERE YOU WILL FIND ALL THE ROUTES FOR LIFESTYLE WEBSITE.");
});

userRouter.post("/signup",register);

userRouter.post("/login",login);

userRouter.post('/Resetpassword',ResetLink)

userRouter.post("/update",authentication,update)

module.exports = {
    userRouter
}