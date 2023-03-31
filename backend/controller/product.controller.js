const {UserModel} = require("../Model/user.model")
const {productModel} = require("../Model/product.model")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllProduct = async(req,res)=>{
    try{
        let data = await productModel.find();
        res.send(data);
    }
    catch(e){
        res.send(e);
    }
}

const creater = async(req,res)=>{
    const {title,description,price,category,image} =  req.body;
    let {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const userexits = await UserModel.findOne({_id:userId})
    let owner = userexits.userName;

    const product = new productModel({
        title,description,price,category,image,owner
    })

    try{
        await product.save()
        res.json({msg : "product created successfull"})
    }
    catch(e){
        res.send(e)
    }
}

const updater = async(req,res)=>{
    const {title,description,price,category,image} =  req.body;
    let {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const userexits = await UserModel.findOne({_id:userId})
    const item = await productModel.findOne({name})
    let owner = userexits.userName;

    try{
        await productModel.updateOne(item,{$set:{title,description,price,category,image,owner}})
        res.send("Category Updated Successfully");
    }
    catch(err){
        res.send(err);
    }

}

const deleteId = async(req,res)=>{
    const one = req.query;
    try{
        await productModel.deleteOne(one)
        res.send("Successfully Deleted")
    }
    catch(err){
        res.send(err)
    }
}


module.exports = {getAllProduct,creater,updater,deleteId};