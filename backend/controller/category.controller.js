const {categoryModel} = require("../Model/category.model");
const {UserModel} = require("../Model/user.model")
const jwt = require("jsonwebtoken");
const { categoryRouter } = require("../Routes/category.route");
require("dotenv").config();

const creater = async(req,res)=>{
    const {name,slug,image} =  req.body;
    let {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const userexits = await UserModel.findOne({_id:userId})
    let owner = userexits.userName;

    const category = new categoryModel({
        name,
        slug,
        image,
        owner
    })
    try{
        await category.save()
        res.json({msg : "Category created successfull"})
    }
    catch(err){
        console.log(err)
        res.send("Something went wrong, plz try again")
    }
}

const updater = async(req,res)=>{
    const {name,slug,image} =  req.body;
    let {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const userexits = await UserModel.findOne({_id:userId})
    const item = await categoryModel.findOne({name})
    let owner = userexits.userName;

    try{
        await categoryModel.updateOne(item,{$set:{name,slug,image}})
        res.send("Category Updated Successfully");
    }
    catch(err){
        res.send(err);
    }

}

const getalldata = async(req,res)=>{
    const category = req.query;
    if(category){
        try{
            const data = await categoryModel.find(category);
            res.send(data)
        }
        catch(err){
            res.send(err)
        }
    }
    else{
        try{
            const data = await categoryModel.find();
            res.send(data)
        }
        catch(err){
            res.send(err)
        }
    }
}

const deleteId = async(req,res)=>{
    const one = req.query;
    try{
        await categoryModel.deleteOne(one)
        res.send("Successfully Deleted")
    }
    catch(err){
        res.send(err)
    }
}

module.exports = {creater,updater,getalldata,deleteId}