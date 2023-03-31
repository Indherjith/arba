const {Router} = require("express");
const {register,login, forgot, update}  = require("../controller/user.controller")
const userRouter = Router();
const {authentication} = require("../middlewares/authorisation")



userRouter.post("/signup",register);

userRouter.post("/login",login);

userRouter.post("/forgotpassword",forgot)

userRouter.post("/update",authentication,update)

module.exports = {
    userRouter
}