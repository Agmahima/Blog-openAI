const router=require("express").Router();
const Joi = require("joi");
const {User}=require("../models/user");
const joi=require("joi");
const bcrypt= require('bcrypt')

router.post("/login",async(req,res)=>{
    try{
        const { email, password } = req.body;
        console.log(`Logging in with ${email} and ${password}`)
        const user=await User.findOne({email:req.body.email});

        if(!user) 
          return res.status(401).send({message:"Email not found on our servers!"})

        const ValidPassword=await bcrypt.compare(req.body.password,user.password);
        if(!ValidPassword){
            return res.status(401).send({message:"Invalid Password. Please Input the correct password!"});
        }

        const token=user.generateAuthToken();
        console.log(token);
        res.status(200).send({token:token,message:'Logged in Successfully!'});
    }catch(error){
          res.status(500).send({message:'Internal Server error'})
    }
});
const validate=(data)=>{
    const schema=Joi.object({
        email:Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
}

module.exports=router;