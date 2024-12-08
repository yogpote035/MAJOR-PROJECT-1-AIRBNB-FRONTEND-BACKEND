const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isOwner, isLoggedIn, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.post("/search",wrapAsync(listingController.SearchByTitle))

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.NewListingFormResponse))

// add new listing
router.get("/new", isLoggedIn, listingController.NewListingForm)

 

router.get("/category/trending",wrapAsync(listingController.trendingCategory));



router.get("/category/room",wrapAsync(listingController.roomCategory));


router.get("/category/mountain",wrapAsync(listingController.MountainCategory));


router.get("/category/lake",wrapAsync(listingController.LakeCategory));


router.get("/category/pool",wrapAsync(listingController.PoolCategory));

router.get("/category/beach",wrapAsync(listingController.BeachCategory));

router.get("/category/treehouse",wrapAsync(listingController.TreeHouseCategory));


router.get("/category/camping",wrapAsync(listingController.CampingCategory));


router.get("/category/city",wrapAsync(listingController.CityCategory));


router.get("/category/tower",wrapAsync(listingController.TowerCategory));


router.get("/category/river",wrapAsync(listingController.RiverCategory));




router.get("/category/couplespot",wrapAsync(listingController.CoupleSpotCategory));


router.get("/category/offcountry",wrapAsync(listingController.OffCountryCategory));




router.get("/category/vacation",wrapAsync(listingController.VacationCategory));


router.get("/category/honeymoon",wrapAsync(listingController.HoneymoonCategory));

router.get("/category/boat",wrapAsync(listingController.BoatsCategory));



router.route("/:id")
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.DeleteListing))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.GetEditFormResponse))
    .get(wrapAsync(listingController.ShowParticular))




// edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.GetEditForm))



module.exports = router;