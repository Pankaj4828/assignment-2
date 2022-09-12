const express = require("express")
const User = require("../model/user")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret="RESTAPI"



router.post("/register", body("name").isAlpha(), body('email').isEmail(), body("password").isLength({
    min: 8,
    max: 13
}), async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async function (err, hash) {
       
            if (err) {
                res.json({
                    status: "failled",
                    message: err.message
                })
            }
                
                const data = await User.create({name:req.body.name,
                    email: email,
                    password:hash
                })
                res.json({
                    status: "sucess",
                   message: "Registration successful"
                   
                })
            
        });


    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }

})

router.post("/login",body("email"),body("password"),async(req,res)=>{
try {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    const data=await User.findOne({email});
    if(!data)
    {
      return  res.status(400).json({
             status:"failed",
             message:"user is not Register"
        })
    }

    bcrypt.compare(password, data.password, function(err, result) {
        // result == true
        if(err)
        {
            res.json({
                status:"failed",
                message:err.message
            })
        }
       const token= jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data._id
          }, secret);
          res.json({
              status:"success",
              token
          })
    });
} catch (e) {
    res.json({
        status:"failed",
        message:e.message
    })
}
    
})

module.exports = router;