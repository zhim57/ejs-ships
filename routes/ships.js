const express= require("express");
const routerS= express.Router();


routerS.get("/trotor", (req,res)=> {
    res.render("index2.ejs");
})

module.exports =routerS;