const express = require("express")
const authentication = require("../middelware/auth")
const Todo = require("../module/todo.model")

const router = express.Router()

router.get("",authentication,async(req,res)=>
{
   try {
    const tododata = await Todo.find().lean().exec()
    return res.status(200).send({tododata})
   } catch (error) {
       return res.status(500).send({message:error.message})
   }
});

router.post("",authentication,async(req,res)=>
{
   try {
    const tododata = await Todo.create(req.body)
    return res.status(200).send({tododata})
   } catch (error) {
       return res.status(500).send({message:error.message})
   }
});

router.get("/:id",authentication,async(req,res)=>
{
   try {
    const tododata = await Todo.find(req.body.id).lean().exec()
    return res.status(200).send({tododata})
   } catch (error) {
       return res.status(401).send({message:error.message})
   }
});

router.patch("/:id",authentication,async(req,res)=>
{
   try {
    const tododata = await Todo.findByIdAndUpdate(req.body.id,req.body,{new:true})
    return res.status(200).send({tododata})
   } catch (error) {
       return res.status(500).send({message:error.message})
   }
});

router.delete("/:id",authentication,async(req,res)=>
{
   try {
    const tododata = await Todo.findOneAndDelete(req.body.id)
    return res.status(200).send({tododata})
   } catch (error) {
       return res.status(500).send({message:error.message})
   }
});

module.exports = router;