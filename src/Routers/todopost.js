const express = require("express")
const router = express.Router()
const {validationResult, body}  = require("express-validator")
const { find } = require("../Models/todoModel")


//models import
const todoModel = require("../Models/todoModel")


//data-parser
router.use(express.json())


//middleware
router.post("/todoposts", body("item").isString(), 
                        body("priority_level").isString(),
                        body("due_date").isDate(),
                        body("starred").isString(), async(req, res)=>{
    try{
        const {item, priority_level, due_date, starred} = req.body;
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({ errors: err.array() });
        }
        
        //creatig todo model
        const data =await todoModel.create({
            item,
            priority_level,
            due_date, 
            starred,
            userId:req.userId
        })
        return res.status(201).json({
            data
        })

    }catch(e){
        console.log(e)
    }
})

// router.get("/todoposts",async(req, res)=>{
//     try{
//         const data = await todoModel.find({userId:req.userId})
//         res.status(200).json(data)
//     }catch(e){
//         return res.status(500).json(e)
//     }
// })
router.put("/todoposts/:id",async(req, res)=>{
    try{
        console.log(req.body)
        const data = await todoModel.updateOne({_id:req.params.id}, {
            starred : req.body.starred
        })
        res.status(201).json(data)
    }catch(e){
        return res.status(500).json(e)
    }
})

router.get("/todoposts",async(req, res)=>{
    try{
        console.log(req.query)
        let comp = req.query.iscompleted

        if(req.query.iscompleted==="All") comp = ["true", "false"]
        else comp=[req.query.iscompleted]
        let ascDec = parseInt(req.query.nearDate)

        let data;


        switch(req.query.dueDate){
            case "Today":
            data = await todoModel.find({$and:[{userId:req.userId}, {due_date:{$eq:new Date()}}]})
            .where("isCompleted")
            .in([...comp])
            .sort({due_date:ascDec})
             return res.status(200).json(data)
             case "Upcomings":
            data = await todoModel.find({$and:[{userId:req.userId}, {due_date:{$gt:new Date()}}]})
            .where("isCompleted")
            .in([...comp])
            .sort({due_date:ascDec})
             return res.status(200).json(data)

             case "Expired":
            data = await todoModel.find({$and:[{userId:req.userId}, {due_date:{$lt:new Date()}}]})
            .where("isCompleted")
            .in([...comp])
            .sort({due_date:ascDec})
             return res.status(200).json(data)

             default :
             data = await todoModel.find({userId:req.userId})
             .where("isCompleted")
            .in([...comp])
            .sort({due_date:ascDec})
             res.status(200).json(data) 
             return 
        }
           

        


    }catch(e){
        return res.status(500).json(e)
    }
})

module.exports = router
