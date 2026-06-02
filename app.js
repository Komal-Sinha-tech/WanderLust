//Require all packages
const express = require("express");
const session = require ("express-session");
const flash = require("connect-flash");
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



//session
const sessionOptions = {
    secret:"secretCode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        express:Date.now() + 7 * 24 * 60 *60 * 100,
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly :true,
    },
};

//root route
app.get("/",(req,res)=>{
    res.send("hi, I am root");
});

app.use(session(sessionOptions));
  app.use(flash());

//session connect
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//routes connect
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

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