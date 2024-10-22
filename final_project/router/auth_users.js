const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:"fahad",password:"1234"},{username:"ali",password:"1234"}];

const isValid = (username)=>{
  return users.some(user => user.username === username);
}


const authenticatedUser = (username,password)=>{}

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
    return res.status(200).json(req.session)
 
  }
  return res.status(401).json({message:"Invalid credentials"})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params?.isbn;
  const session = req.session
  
  if(isbn){
    const {review} = req.body;
    if(review){
      if(session && session.token){
        jwt.verify(session.token, 'fingerprint_customer', (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized access' });
          } else {
            books[isbn].reviews[decoded.username] = review;
            return res.status(200).json({message:"Review added successfully"})
          }
        });
      }else{
        return res.status(401).json({message:"Unauthorized access"})
      }
    }else{
      return res.status(400).json({message:"Please provide the review"})
    }
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
