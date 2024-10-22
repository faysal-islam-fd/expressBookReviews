const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:"fahad",password:"1234"},{username:"ali",password:"1234"}];

const isValid = (username)=>{
  return users.some(user => user.username === username);
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username,password} = req.body;
  // console.log(req.body);
  
  if(!username || !password){
    return res.status(400).json({message:"All fields are required"})
  }
  if(isValid(username)){

    const token = jwt.sign({username}, 'fingerprint_customer');
    req.session.token = token;
    return res.status(200).json({username,password})
 
  }
  return res.status(401).json({message:"Invalid credentials"})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
