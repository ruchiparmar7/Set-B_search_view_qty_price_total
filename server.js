const express = require("express")
const mongoose = require("mongoose")
const app = express()


mongoose.connect("mongodb://127.0.0.1:27017/BookStore")
var conn = mongoose.connection
conn.on('connected', function () {
    console.log("Connected to mongoDB")
})

const bookSchema = new mongoose.Schema({
    "BookId": String,
    "title": String,
    "Author": String,
    "publishDate": String,
    "price": Number,
    "category": String
})

const book = mongoose.model("book", bookSchema, "Book")


app.use(express.json())
app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/homepage.html")
})

app.get("/api/book", function (req, res) {
   
    book.find().then((data) => {
        res.json(data)
    })
})

app.post("/api/add", function (req, res) {

    console.log(req.body.bookID)
    book.create({
        BookId: req.body.bookID,
        title: req.body.title,
        Author: req.body.author,
        publishDate: req.body.pdate,
        category: req.body.category,
        price: req.body.price,
    }).then((newItem) => {
        console.log(newItem)
        res.json(newItem)
    }, (err) => {
        res.json(err);
        console.log('Error')
    })
})

app.listen("5500", function () {
    console.log("Server Running On Port: 5500")
})