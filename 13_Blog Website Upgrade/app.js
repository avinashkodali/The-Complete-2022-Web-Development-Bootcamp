//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { functions } = require("lodash");
const dotenv = require("dotenv").config();

const homeStartingContent = "Hello, This website is developed to post the daily journals which helps to spread information. The journals in this website range from tech news to sports. Our Team will update the daily news and hope you will find the information helpful. \" Sharing knowledge is not about giving people something, or getting something from them. That is only valid for information sharing. Sharing knowledge occurs when people are genuinely interested in helping one another develop new capacities for action; it is about creating learning processes. \" - Peter Senge";
const aboutContent = "Hello, This website is developed to post the daily journals which helps to spread information. The journals in this website range from tech news to sports. Our Team will update the daily news and hope you will find the information helpful. ";
const contactContent = "I am Avinash Kodali, developer of this application. I am a Computer Engineering (Computer Systems) student from Arizona State University passionate about developing software applications. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];

mongoose.connect(process.env.MONGOLAB_URI+"/blogDB", {useNewUrlParser: true});

const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model("Post",postSchema);

app.get("/", function(req, res){
  Post.find(function(err,posts){
    if(err)
      console.log(err);
    else
      res.render("home",{
        startingContent: homeStartingContent,
        posts : posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // posts.push(post);

  post.save(function(err){
    if(!err)
      res.redirect("/");
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id : requestedPostId},function(err,post){
    res.render("post",{
      title: post.title,
      content: post.content
    });
  });
});

let port = process.env.PORT;
if(port==null || port == ""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port "+port);
});
