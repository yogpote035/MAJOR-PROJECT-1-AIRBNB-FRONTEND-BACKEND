const axios = require('axios');
const { OPEN_CAGE_API_KEY } = process.env; // Ensure the API key is securely stored
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (request, response) => {
    const allListing = await Listing.find({});
    response.render("listings/index.ejs", { allListing });
}

const categoryArray = ["Beach", "City", "Mountain", "River", "Farm", "Couple-spot", "Honeymoon", "Room", "Pool", "Tree-house", "Camping", "Tower", "Trending", "Off-country", "boats", "Vacation"];

module.exports.NewListingForm = (request, response) => {
    response.render("listings/newListings.ejs", { categoryArray });
}



module.exports.NewListingFormResponse = async (request, response, next) => {
    let url = request.file.path;
    let filename = request.file.filename;

    const { location, country, category } = request.body.listing;
    const address = `${location}, ${country}`; // Combine location and country

    try {
        // Fetch coordinates using OpenCage API
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`;
        const geocodeResponse = await axios.get(geocodeUrl);

        // Extract latitude and longitude
        const { lat, lng } = geocodeResponse.data.results[0]?.geometry || {};
        if (!lat || !lng) {
            throw new ExpressError(500, "Unable to fetch coordinates for the given address.");
        }


        // Create and save the new listing
        const newListing = new Listing({
            ...request.body.listing,
            category,
            owner: request.user._id,
            image: { url, filename },
            coordinates: [lng, lat], // Save as [longitude, latitude]
        });
        await newListing.save();

        request.flash("success", "New Listing Created And Live!");
        response.redirect("/listings");
    } catch (error) {
        request.flash("error", "Failed to create the listing. Please try again.");
        response.redirect("/listings/new");
        throw new ExpressError(error);
    }
};


module.exports.GetEditForm = async (request, response) => {
    let { id } = request.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        request.flash("error", "listing you requested dose not exist!");
        response.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_350");
    response.render("listings/editListing.ejs", { listing, originalImageUrl });
}



module.exports.GetEditFormResponse = async (request, response) => {
    let { id } = request.params;

    let newListing = await Listing.findByIdAndUpdate(id, { ...request.body.listing });

    if (typeof request.file !== 'undefined') {
        let url = request.file.path;
        let filename = request.file.filename;
        newListing.image = { url, filename };
        await newListing.save();
    }

    request.flash("success", "Listing Update is Successful");

    response.redirect(`/listings/${id}`);
}


module.exports.ShowParticular = async (request, response) => {
    let { id } = request.params;
    let listing = await Listing.findById(id).populate(
        {
            path: "reviews",
            populate: {
                path: "author",
            },
        },
    ).populate("owner");
    if (!listing) {
        throw new ExpressError(404, "Listing dose not exist!");
    }
    response.render("listings/OneShowListing.ejs", { listing });
}


module.exports.DeleteListing = async (request, response) => {
    let { id } = request.params;
    await Listing.findByIdAndDelete(id);
    request.flash("success", "Listing is Deleted");

    response.redirect("/listings");
}


module.exports.SearchByTitle = async (request, response) => {
    let { search } = request.body;

    const listings = await Listing.find({
        title: { $regex: search, $options: "i" } // Matches the input in any case
    });
    if (!listings) {
        throw new ExpressError(404, "Search Listing not found");
    }
    response.render("listings/searchListings.ejs", { listings, search });
}

// find by category specific  single route for single category

// 1 trending
module.exports.trendingCategory = async (request, response) => {
    let categoryFind = "Trending";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 2 room
module.exports.roomCategory = async (request, response) => {
    let categoryFind = "Room";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 3 Mountain
module.exports.MountainCategory = async (request, response) => {
    let categoryFind = "Mountain";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 4 Lake
module.exports.LakeCategory = async (request, response) => {
    let categoryFind = "Lake";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 5 Pool
module.exports.PoolCategory = async (request, response) => {
    let categoryFind = "Pool";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 6 Beach
module.exports.BeachCategory = async (request, response) => {
    let categoryFind = "Beach";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 7 TreeHouse
module.exports.TreeHouseCategory = async (request, response) => {
    let categoryFind = "Tree-house";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 8 Camping
module.exports.CampingCategory = async (request, response) => {
    let categoryFind = "Camping";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 9 TopCity
module.exports.CityCategory = async (request, response) => {
    let categoryFind = "City";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 10 Tower 
module.exports.TowerCategory = async (request, response) => {
    let categoryFind = "Tower";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 11 River
module.exports.RiverCategory = async (request, response) => {
    let categoryFind = "River";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 12 CoupleSpot
module.exports.CoupleSpotCategory = async (request, response) => {
    let categoryFind = "Couple-spot";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 13 off country
module.exports.OffCountryCategory = async (request, response) => {
    let categoryFind = "Off-country";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 14 vacation
module.exports.VacationCategory = async (request, response) => {
    let categoryFind = "Vacation";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}

// 15 Honeymoon
module.exports.HoneymoonCategory = async (request, response) => {
    let categoryFind = "Honeymoon";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}


// 16 Boats
module.exports.BoatsCategory = async (request, response) => {
    let categoryFind = "boats";
    const allListing = await Listing.find({ category: categoryFind });
   
    if (!categoryFind) {
        request.flash("error",`find category not exists`);
        return response.redirect("/listings");
    }
    response.render("listings/findListingByCategory.ejs", { allListing ,categoryFind});
}
