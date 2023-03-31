const express = require('express');

const {connection} = require("./config/db");

const cors = require("cors");

const app = express();

const {userRouter} = require("./Routes/user.route");

require("dotenv").config();

let PORT = process.env.PORT || 8500;

app.use(cors());
app.use(express.json());

app.use("/",userRouter);

app.listen(PORT,async ()=>{
    try{
        await connection;
        console.log(`Your mongo DataBase is Connected`);
    }catch(err){
        console.log(err)
    }
    console.log(`Listening on port ${PORT}`);
})