const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotEnv = require("dotenv")
const mongoose = require("mongoose")

//import modules
const login = require("./src/Routers/login")
const register = require("./src/Routers/register")
const todoPost = require("./src/Routers/todopost")

//env configer
dotEnv.config()

//port
const port  = 5500;

//mongoose connections
const main = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to mongodb")
    }catch(e){
        console.log(e)
    }
    
}
main()


//middle-ware
app.use(cors({
    origin:"*"
}))

//jwt token verification
app.use('/app/v1/todoposts', (req, res, next)=>{
    try{
        const token =req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET_KEY,(err, result)=>{
            if(err){
                return res.status(401).json({
                    status:"Failure",
                    message:"Denied Authorization"
                })
            }
            else{
                req.userId = result.data;
                next();
            }
        })

    }catch(e){
        res.status(403).json({
            status:"error",
            message:e.message
        })
    }
})

app.use('/app/v1/todoposts/:id', (req, res, next)=>{
    try{
        const token =req.headers.authorization;
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_KEY,(err, result)=>{
            if(err){
                return res.status(401).json({
                    status:"Failure",
                    message:"Denied Authorization"
                })
            }
            else{
                req.userId = result.data;
                next();
            }
        })

    }catch(e){
        res.status(403).json({
            status:"error",
            message:e.message
        })
    }
})

///midle ware calls
app.use("/app/v1", register)
app.use("/app/v1", login)
app.use("/app/v1", todoPost)


//port listening
app.listen(process.env.PORT, (e)=>{
    if(e){
        console.log(e)
    }
    else{
        console.log("Server is up at", process.env.PORT)
    }
});
