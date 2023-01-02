// jshint: esversion: 6 

const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let listItems=["Buy Food","Cook Food","Eat Food"];

app.get("/", function (req, res) {
    const todayDate=date.getDate();
    res.render("list", { kindOfDay: todayDate,newListItems: listItems });
    console.log(date);
});

app.post("/",function(req,res){
    let listItem=req.body.list_item;
    listItems.push(listItem)
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
