const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  console.log(req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "Successfully Registered. Now you can login" });
  
});

// Get the book list available in the shop
public_users.get('/',async function (req, res){
  
  const  allBooks = await Object.values(books)
  return res.status(200).json({allBooks})
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
  const title = req.params?.title;
  if(!title){
    return res.status(400).json({message:"Please provide a title"})
  }

  const booksByTitle = Object.values(books).filter(book=> book.title === title)
  if(booksByTitle.length!==0){
    return res.status(200).json({booksByTitle})
  }
  res.status(404).json({message:"Books not found"})
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params?.isbn;
  console.log(isbn);
  
  if(isbn){
    const findIsbn = Object.keys(books).find(bookIsbn=> bookIsbn===isbn)
    if(findIsbn){
      return res.status(200).json(books[findIsbn])
    }
    return res.status(404).json({message:"Not found"})
  }
  return res.status(400).json({message:"Provide the book isbn"})
});

module.exports.general = public_users;
