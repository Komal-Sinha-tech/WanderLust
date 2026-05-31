//Require all packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

//connection to DB
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
};

//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


//root route
app.get("/",(req,res)=>{
    res.send("hi, I am root");
});

//Error
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}= err;
   res.status(status).render("listings/error.ejs", { err });
    // res.status(status).send(message);
});

//Server confirmation
app.listen(8080,()=>{
    console.log("server is running on port 8080");
});