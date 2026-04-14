const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const MONGO_URL ="mongodb://127.0.0.1:27017/WanderLust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}


app.get("/",(req,res)=>{
    res.send("hi, I am root");
});

app.get("/testListing",async (req,res)=>{
 const sampleListing = new Listing ({
    title:"my Villa",
    description:"by the beach",
    price:1500,
    location:"ooty",
    country:"India",
 });
 await sampleListing.save();
 console.log("sample was saved");
 res.send("succesful");
});
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});