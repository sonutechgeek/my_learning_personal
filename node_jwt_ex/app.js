const express= require('express');
const jwt=require('jsonwebtoken');

const app=express();


app.get('/',(req,res)=>{
    res.json({
        message:"message sent"
    })
});

app.listen(5000,()=>{
    console.log("app is running on 5000");
})