const {Router} = require("express");
const productRouter = Router();
const {authentication} = require("../middlewares/authorisation")
const {getAllProduct,creater,updater,deleteId} = require("../controller/product.controller")

productRouter.get("/",authentication,getAllProduct)
productRouter.post("/",authentication,creater)
productRouter.patch("/",authentication,updater)
productRouter.delete("/",authentication,deleteId)

module.exports= {productRouter}