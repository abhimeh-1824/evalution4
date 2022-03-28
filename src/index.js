const express = require("express");
const {register,login} = require("./controller/loginAndSinup")
const app = express();
app.use(express.json())

const tododata = require("./controller/user")

app.post("/register",register)
app.post("/login",login)

app.use("/todo",tododata)
module.exports = app;