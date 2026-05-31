//Require all packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingschema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const listings = require("./routes/listing.js");


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

//server validation 
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

app.use("/listings",listings);


//root route
app.get("/",(req,res)=>{
    res.send("hi, I am root");
});

//model data / sample data
// app.get("/testListing",async (req,res)=>{
//  const sampleListing = new Listing ({
//     title:"my Villa",
//     description:"by the beach",
//     price:1500,
//     location:"ooty",
//     country:"India",
//  });
//  await sampleListing.save();
//  console.log("sample was saved");
//  res.send("succesful");
// });




//reviews
//post review route
app.post("/listings/:id/reviews", validateReview , wrapAsync (async (req,res)=>{
let listing = await Listing.findById(req.params.id);
let newReview = new Review(req.body.review);

 listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("new review saved");
 

  res.redirect(`/listings/${listing._id}`);

}));

//Delete review route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
let {id,reviewId} = req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
res.redirect(`/listings/${id}`);
}));


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