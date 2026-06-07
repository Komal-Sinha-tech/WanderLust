const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema ,reviewSchema } = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");



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
router.get("/new",isLoggedIn,wrapAsync(async(req,res)=>{
  console.log(req.user);
    res.render("./listings/new.ejs");
}));


//show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    
      let {id}= req.params;
     const listing = await Listing.findById(id).populate("reviews");
     if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
     }
    res.render("./listings/show.ejs",{listing});   
})
);

//Create Route
router.post("/",isLoggedIn, validateListing,wrapAsync(async(req,res,next)=>{
   let result = listingSchema.validate(req.body);
   console.log(result);
   if(result.error){
    throw new ExpressError(400,result.error);
   }
    const newListing = new Listing (req.body.listing);

    await newListing.save();
   req.flash("success", "New Listing Created!");
res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
   if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
     }
  res.render("listings/edit.ejs", { listing });
}));


//Update Route
router.put("/:id",isLoggedIn,validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;

  req.body.listing.image = {
    url: req.body.listing.image,
    filename: "listingimage"
  };

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",isLoggedIn,async(req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
      req.flash("success", "Deleted the Listing");
     res.redirect("/listings");
});

module.exports=router;
