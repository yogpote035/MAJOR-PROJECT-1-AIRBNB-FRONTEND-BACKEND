const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow("", null),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
        category: joi.string().valid(
            "Default","Beach", "City", "Mountain", "River", "Farm", "Couple-spot", "Honeymoon",
            "Room", "Pool", "Tree-house", "Camping", "Tower", "Trending", "Off-country",
            "boats", "Vacation"
        ).required(),
    }).required(),
})


// this is schema for our all field required when sending request not empty in db


module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().required()
    }).required()
})