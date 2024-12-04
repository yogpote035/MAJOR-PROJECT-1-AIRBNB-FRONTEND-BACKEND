const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isOwner, isLoggedIn, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.NewListingFormResponse))

// add new listing
router.get("/new", isLoggedIn, listingController.NewListingForm)




router.route("/:id")
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.DeleteListing))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.GetEditFormResponse))
    .get(wrapAsync(listingController.ShowParticular))




// edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.GetEditForm))



module.exports = router;