const {Router} = require("express");
const {register,login}  = require("../controller/user.controller")
const userRouter = Router();

userRouter.get("/",(req,res)=>{
    res.send("Hey people, THERE YOU WILL FIND ALL THE ROUTES FOR LIFESTYLE WEBSITE.");
});

userRouter.post("/signup",register);

userRouter.post("/login",login);

module.exports = {
    userRouter
}