const Listing = require("../models/listing");
const Reviews = require("../models/review.js");


module.exports.AddReviewResponse = async (request, response) => {
    let { id } = request.params;
    console.log(request.params);
    let listing = await Listing.findById(id);
    let newReview = new Reviews(request.body.review);

    newReview.author = request.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    request.flash("success", "New Review Created");

    response.redirect(`/listings/${id}`);
}



module.exports.DeleteReview = async (request, response) => {
    let { id, reviewId } = request.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviews.findByIdAndDelete(reviewId);

    request.flash("success", "Review is Deleted");

    response.redirect(`/listings/${id}`);
}
