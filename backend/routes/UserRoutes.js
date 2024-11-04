const express=require('express');
const router=express.Router();
const studentModel=require('../userSchema.js')

 //GET Route to fetch all students
 
 router.get('/',async(req,res)=>{
    try{
        const details=await studentModel.find();
        res.json(details)
    }
    catch(err){
        res.status(500).json({err:"Data fetching error"})
        console.log('Data not fetched : ',err);  
    }
})

 //POST Route to create new student
router.post('/',async(req,res)=>{
    try{
        const {name,age,course}=req.body;
        const details1=await studentModel.create({name,age,course})
        res.status(201).json({
            data:details1
        }
        )
    }
    catch(err){
        res.status(400).json({err:"Data fetching Error"})
        console.log('Data not fetched : ',err);  
    }
})

//Retrieve one student data for updation
router.get('/:id',async(req,res)=>{
        try{
            const id=req.params.id;
            const updateuser=await studentModel.findById(id)
            res.status(201).json(updateuser)
        }
        catch(err){
            res.status(500).json({Error:"Server side error.Data not fetched"})
        }
    })
    //Update details of student
    router.put('/:id',async(req,res)=>{
        try{
            const details=req.body;
            const id=req.params.id;
            const updateuser=await studentModel.findByIdAndUpdate(id,details,{new:true})
            if(!updateuser){
                return res.status(404).json({Error : 'No student found'})
            }
            res.status(200).json({data:updateuser})
        }
        catch(err){
            res.status(500).json({Error : err.Error})
        }
    })
    //delete a student from server
    router.delete('/:id',async(req,res)=>{
        try{
            const id=req.params.id;
            const deleteduser=await studentModel.findByIdAndDelete(id)
            if(!deleteduser){
                return res.status(500).json({Message : "No student found for delete"})
            }
            const remainingusers=await studentModel.find();
            res.status(200).json(remainingusers)
        }
        catch(err){
            res.status(500).json({Error :`Deleting data error : ${err}`})
        }
    })
    

module.exports=router;