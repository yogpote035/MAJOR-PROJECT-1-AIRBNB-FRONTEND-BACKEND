const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// for authentication
module.exports.isLoggedIn = (request, response, next) => {
    request.session.redirectUrl = request.originalUrl;
    if (!request.isAuthenticated()) {
        request.flash("error", "you must be logged");
        return response.redirect("/login");
    }
    next();
}
// save url before login redirect

module.exports.saveRedirectUrl = (request, response, next) => {
    if (request.session.redirectUrl) {
        response.locals.redirectUrl = request.session.redirectUrl;

    }
    next();
}


// checking author of the listing to edit

module.exports.isOwner = async (request, response, next) => {
    let { id } = request.params;

    let listing = await Listing.findById(id);

    if (!listing.owner.equals(response.locals.currentUser._id)) {
        request.flash("error", "You are not the owner of this listing");
        return response.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview = (request, response, next) => {
    let { error } = reviewSchema.validate(request.body);
    if (error) {
        // joi is throw error here
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}


module.exports.validateListing = (request, response, next) => {
    let { error } = listingSchema.validate(request.body);
    if (error) {
        // joi is throw error here
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}


// checking author of the listing to edit

module.exports.isReviewAuthor = async (request, response, next) => {
    let { id, reviewId } = request.params;

    let review = await Review.findById(reviewId);

    if (!review.author.equals(response.locals.currentUser._id)) {
        request.flash("error", "You are not the author of this Review");
        return response.redirect(`/listings/${id}`);
    }
    next();
}