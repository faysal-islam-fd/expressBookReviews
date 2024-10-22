const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(200).json(books)
  //Write your code hereisbn
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params?.isbn;
  if(isbn){

  const getBook = Object.keys(books).filter(bookIsbn=> bookIsbn===isbn)
    if(getBook.length!==0){
      return res.status(200).json(books[getBook[0]])
    }
    return res.status(404).json({message:"Book not found"})
  } 
  
  return res.status(400).json({message: "Please provide the book isbn"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  
  if(author){
   
    books = Object.values(books)

  const findAuthor =  books.find(book=> book.author.toLowerCase().includes(author.toLowerCase()))
   
    
  if(findAuthor){
    const booksByAuthor = books.filter(book=>book.author===findAuthor.author)
    return res.status(200).json({booksByAuthor})
  }
    return res.status(404).json({message:"Author not found"})
  }
  return res.status(400).json({message:"Please provide a author name"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
