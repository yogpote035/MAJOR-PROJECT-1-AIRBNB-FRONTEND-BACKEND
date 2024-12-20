const mongoose = require("mongoose");
const Reviews = require("./review.js");
const { ref, required } = require("joi");
const { type } = require("os");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  category: [
    {
      type: String,
      enum: [
        "Beach","Lake", "City", "Mountain", "River", "Farm", "Couple-spot",
        "Honeymoon", "Room", "Pool", "Tree-house", "Camping", "Tower",
        "Trending", "Off-country", "boats", "Vacation"
      ],
      required: true
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  coordinates: {
    type: [Number]
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;