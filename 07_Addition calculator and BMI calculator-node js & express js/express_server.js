var express=require("express");
var bodyParser=require("body-parser");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/addition-calculator",function(req,res){
    res.sendFile(__dirname+"/addition_calculator.html");
});

app.get("/bmi-calculator",function(req,res){
    res.sendFile(__dirname+"/bmi_calculator.html");
});



app.post("/addition-calculator/",function(req,res) {
    var num1=parseFloat(req.body.num1);
    var num2=parseFloat(req.body.num2);
    var result=num1+num2;
    res.send("The result is: "+result);
});

app.post("/bmi-calculator/",function(req,res) {
    var height=parseFloat(req.body.height);
    var weight=parseFloat(req.body.weight);
    var result=weight/(height*height);
    res.send("The result is: "+result);
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
});

