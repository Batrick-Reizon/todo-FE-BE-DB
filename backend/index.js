const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// Connecting Mongoose with Database
mongoose.connect(MONGO_URI)
.then(() => console.log("Database Connected"))
.catch(() => console.log("Failed to connect with Database"))

// Create Model
var fruits = mongoose.model("fruits",{name:String},"fruits")

// Sending Fruit List
app.get("/fruitslist", (req,res) =>
{
    fruits.find()
    .then((retdata)=>
    {
        console.log(retdata)
        res.send(retdata)
    })
    .catch((err) =>
    {
        console.log("Failed to show Fruitlist", err)
        res.status(500).send("Failed to show Fruitlist", err)
    })
})

// Adding Fruit
app.post("/addfruit", (req,res) =>
{
    const newfruit = req.body.newfruit

    const newFruit = new fruits({name:newfruit})

    newFruit.save()
    .then((fruitsaved) => 
    {
        console.log("Fruit Saved:",newfruit)
        res.send(fruitsaved)
    })
    .catch((err) =>
    {
        console.log("Failed to save Fruit", err)
        res.status(500).send("Failed to save Fruit", err)
    })
})

// Delete Fruit
app.delete("/deletefruit/:id", (req,res) =>
{
    const fruitid = req.params.id
    console.log(fruitid)

    fruits.findByIdAndDelete(fruitid)
    .then((fruitdelete) =>
    {
        console.log("Fruit Deleted:",fruitid)
        res.send(fruitdelete)
    })
    .catch((err) =>
    {
        console.log("Fruit Deleted", err)
        res.status(500).send("Fruit Deleted", err)
    })
})

// Server Start
app.listen(PORT, () =>
{
    console.log(`Server Started in port number ${PORT}`)
})