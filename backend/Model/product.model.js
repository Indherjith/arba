const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    title : {type : String},
    description:{type:String},
    price:{type:Number},
    category:{type:String},
    image : {type : String},
    owner : {type : String}
})

const productModel = mongoose.model("product", productSchema)


module.exports = {
    productModel
}