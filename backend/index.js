const express = require('express');

const {connection} = require("./.config/db");

const cors = require("cors");

const app = express();

require("dotenv").config();
let PORT = process.env.PORT || 8500;

app.use(cors());
app.use(express.json());

const {userRouter} = require("./Routes/user.route");
const { categoryRouter } = require('./Routes/category.route');
const {productRouter} = require('./Routes/product.route')

app.get("/",(req,res)=>{
    res.send("Hey people, This is ArBa server");
});

app.use("/auth",userRouter);
app.use("/category",categoryRouter)
app.use("/product",productRouter)

app.listen(PORT,async ()=>{
    try{
        await connection;
        console.log(`Your mongo DataBase is Connected`);
    }catch(err){
        console.log(err)
    }
    console.log(`Listening on port ${PORT}`);
})