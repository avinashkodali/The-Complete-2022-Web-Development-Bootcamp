// jshint: esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    // const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=aea5492c2191668309782f0075122367&units=metric";
    // https.get(url,function(response){
    //     console.log(response.statusCode);
    //     response.on("data",function(data){
    //         const weatherData=JSON.parse(data);
    //         const temp=weatherData.main.temp;
    //         const weatherDescription=weatherData.weather[0].description;
    //         const icon=weatherData.weather[0].icon;
    //         const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    //         res.write("<h1> The temperature in London is "+temp+" degree celsius.</h1>");
    //         res.write("<p>The weather is currently "+weatherDescription+"</p>");
    //         res.write("<img src="+imageUrl+">")
    //         res.send();
    //     });
    // });
});

app.post("/",function(req,res){
    const location = req.body.location;
    const appid = "aea5492c2191668309782f0075122367";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1> The temperature in "+location+" is "+temp+" degree celsius.</h1>");
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<img src="+imageUrl+">")
            res.send();
        });
    });
});

app.listen("3000",function(){
    console.log("Server is running on port 3000");
});

