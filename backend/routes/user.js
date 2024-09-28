const router=require("express").Router();
const{User,validate}=require("../models/user");
const bcrypt=require("bcrypt");

router.post("/signup",async(req,res)=>{
    try{
        const user=await User.findOne({email: req.body.email});

        if(user)
          return res.status(409).send({message:"User with given email already exists"});

        const salt=await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword=await bcrypt.hash(req.body.password,salt);

        console.log(`Saving user ${req.body.email} with password ${hashPassword}`)
        await new User({...req.body,password:hashPassword}).save();

        res.status(201).send({message:"User created successfully"})
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports=router;