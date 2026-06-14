const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router
.route("/")
//Index Route
.get(wrapAsync(listingController.index))
//Create Route
// .post(isLoggedIn, validateListing,wrapAsync(listingController.createListing));
.post( upload.single('listing[image]'),(req, res)=>{
    res.send(req.file);
})

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
//show Route
.get(wrapAsync(listingController.showListing))
//Update Route
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
//Delete Route
.delete(isLoggedIn,isOwner,listingController.destroyListing);


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;
