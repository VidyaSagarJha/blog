//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A blog (a shortened version of 'weblog') is an online journal or informational website displaying information in the reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject. There are many reasons to start a blog for personal use and only a handful of strong ones for business blogging. Blogging for business, projects, or anything else that might bring you money has a very straightforward purpose – to rank your website higher in Google SERPs, a.k.a. increase your visibility.";
const aboutContent = "So, the main purpose of a blog is to connect you to the relevant audience. Another one is to boost your traffic and send quality leads to your website. As a business, you rely on consumers to keep buying your products and services. As a new business, you rely on blogging to help you get to potential consumers and grab their attention. Without blogging, your website would remain invisible, whereas running a blog makes you searchable and competitive.";
const contactContent = "Many people still wonder if there is any difference between a blog and a website. What is a blog and what is a website? It’s even more challenging to differentiate between the two today. For Mor Information Contact Us";

const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    poster: posts
  });

});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact",{contactContent:contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
})
app.post("/compose", function(req,res){

  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})



app.get("/posts/:postName",function(req,res){
  var requestedtitle = _.lowerCase(req.params.postName);
  posts.forEach(function(pp){
    const storedTitle = _.lowerCase(pp.title);

    if(storedTitle === requestedtitle){
      res.render("post",{
        title:pp.title,
        content:pp.content
      });
    }
  })
});

app.listen(8000, function() {
  console.log("Server started on port 8000");
});
