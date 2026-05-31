const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");



//server validation 
// const validateListing = (req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//    let errMsg = error.details.map((el)=>el.message).join(",");
//    if(error){
//     throw new ExpressError(400,errMsg);
//    }else{
//     next();
//    }
// };
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


//Index Route
router.get("/",wrapAsync(async(req,res)=>{
    const allListing = await Listing.find();
    res.render("./listings/index.ejs",{allListing});
}));

//New Route
router.get("/new",wrapAsync(async(req,res)=>{
    res.render("./listings/new.ejs");
}));

//show Route
router.get("/:id", wrapAsync(async(req,res)=>{
    
      let {id}= req.params;
     const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs",{listing});   
})
);

//Create Route
router.post("/", validateListing,wrapAsync(async(req,res,next)=>{
   let result = listingschema.validate(req.body);
   console.log(result);
   if(result.error){
    throw new ExpressError(400,result.error);
   }
    const newListing = new Listing (req.body.listing);

    await newListing.save();
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));


//Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",async(req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
     res.redirect("/listings");
});

module.exports=router;
