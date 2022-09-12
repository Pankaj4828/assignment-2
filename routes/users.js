const express=require("express");
const user=require("../routes/login")
const router=express.Router();


router.get("/",async(req,res)=>{
    try {
        const users=await user.findOne()
    res.json({
        status:"success",
        users
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
        const users=await user.updateOne({_id:req.params.id}, req.body)
    res.json({
        status:"success",
       users
    })
        
    } catch (e) {
        res.json({
            status:"failed",
            message:e.message
        })
    }
    
})
router.delete("/:id", async (req, res) => {
    // Write the code for fetch
    try {
        const users = await user.deleteOne({_id: req.params.id});
        res.json({
            status: "Success",
            users
        })

    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }

});


module.exports=router;