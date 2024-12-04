const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/review.js")
const { isReviewAuthor, isLoggedIn, validateReview } = require("../middlewares.js")

// for review
// take review and store it
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.AddReviewResponse))

// for deleting reviews

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.DeleteReview))

module.exports = router;