const {Router} = require("express");
const categoryRouter = Router();
const {authentication} = require("../middlewares/authorisation")
const {creater,updater,getalldata,deleteId} = require("../controller/category.controller");

categoryRouter.get("/",authentication,getalldata)
categoryRouter.post("/",authentication,creater)
categoryRouter.patch("/",authentication,updater)
categoryRouter.delete("/",authentication,deleteId);

module.exports = {categoryRouter}