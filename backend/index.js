const express=require('express');
const cors=require('cors');
const port=1500;
const app=express();
const studentModel=require('./userSchema')
const mongoose=require('mongoose');
app.use(express.json());
app.use(cors())
mongoose.connect('mongodb://localhost:27017/class')
.then(()=>console.log('Connected Successfully')
)
.catch((err)=>console.log('Not Possible to connect with database : ',err)
)

//Routes
const userRoutes=require('./routes/UserRoutes')
app.use('/api/users',userRoutes);
app.use('/api/users/:id',userRoutes)
app.get('/getid/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updateuser=await studentModel.findById(id)
        res.status(201).json(updateuser)
    }
    catch(err){
        res.status(500).json({Error:"Server side error.Data not fetched"})
    }
})
app.put('/updatebyid/:id',async(req,res)=>{
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
app.delete('/deletebyid/:id',async(req,res)=>{
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
app.listen(port,()=>{
    console.log('Server connecting on port : ',port); 
})