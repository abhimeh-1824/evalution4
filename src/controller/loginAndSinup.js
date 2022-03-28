const User = require("../module/user.model");
var jwt = require('jsonwebtoken');
require('dotenv').config()

const register = async(req,res)=>{
    try {
    
    console.log(req.body.email)
    const user = await User.findOne({email:req.body.email}).lean().exec();
    console.log(user)
    if(user)
    {
        return res.status(400).send({message:"email allready exit"});
    }

    const userdata = await User.create(req.body);
    console.log(userdata)
    console.log(process.env.key)
    var token = jwt.sign({ userdata }, process.env.key);
    return res.status(200).send({userdata:userdata,token:token})
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
}

const login = async(req,res)=>{
    
    try {
    const userdata = await User.findOne({email:req.body.email});
    if(!userdata)
    {
        return res.status(500).send({message:"wrong email or passowrd"});
    }

    const check = userdata.checkPassword(req.body.password);
    if(!check)
    {
        return res.status(500).send({message:"wrong email or passowrd"});
    }
    var token = jwt.sign({ userdata }, process.env.key);
    return res.status(200).send({userdata:userdata,token:token})
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
}

module.exports  = {register,login}