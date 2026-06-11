const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");


router
.route("/")
//Index Route
router.get(wrapAsync(listingController.index));
//Create Route
router.post(isLoggedIn, validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
//show Route
router.get(wrapAsync(listingController.showListing));
//Update Route
router.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
//Delete Route
router.delete(isLoggedIn,isOwner,listingController.destroyListing);


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;
