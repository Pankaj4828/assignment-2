const express = require("express")
const Post=require("../model/post")
const { body, validationResult } = require('express-validator');
const router = express.Router();


router.get("/",async(req,res)=>{
    try {
        const posts=await Post.findOne()
    res.json({
        status:"success",
        posts
    })
        
    } catch (e) {
        res.json({
            status:"failed",
            message:e.message
        })
    }
    
})
router.post("/",body("title"),body("body"), async(req,res)=>{
    try {
        const posts=await Post.create(
            {
              tittle:req.body.tittle,
              body:req.body.body,
              image:req.body.image,
              user:req.user
            }
        )
    res.json({
        status:"success",
        posts
    })
        
    } catch (e) {
        res.json({
            status:"failed",
            message:e.message
        })
    }
    
})
router.put("/:id",async(req,res)=>{
    try {
        const posts=await Post.updateOne({_id:req.params.id},
            {
              tittle:req.body.tittle,
              body:req.body.body
            }
        )
    res.json({
        status:"success",
        posts
    })
        
    } catch (e) {
        res.json({
            status:"failed",
            message:e.message
        })
    }
    
})
router.delete("/:id", async(req,res)=>{
    try {
        const posts=await Post.deleteOne({_id:req.params.id} )
    res.json({
        status:"success",
        message:"post deleted sucessfully"
    })
        
    } catch (e) {
        res.json({
            status:"failed",
            message:e.message
        })
    }
    
})

module.exports = router ;