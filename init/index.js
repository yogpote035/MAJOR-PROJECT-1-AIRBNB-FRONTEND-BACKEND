const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to DB');
}

// Initialize Database
const initDB = async () => {
    try {
        console.log('Deleting existing listings...');
        await Listing.deleteMany({});
        console.log('Existing listings deleted.');

        console.log('Checking if initData.data is an array...');
        console.log(Array.isArray(initData.data)); // Should be true
        console.log('Initial data:', initData.data);

        // Ensure initData.data is an array
        if (!Array.isArray(initData.data)) {
            initData.data = [initData.data];
        }

        // Add owner field to each object
        const transformedData = initData.data.map((obj) => ({
            ...obj,
            owner: new mongoose.Types.ObjectId("674d655058f8245ba21cd23e"), //demo user
        }));

        console.log('Inserting data:', transformedData);

        // Insert the transformed data into the database
        await Listing.create(transformedData);

        console.log('Data was successfully saved.');
    } catch (err) {
        console.error('Error inserting data:', err);
    }
};

// Connect to the database and initialize data
main()
    .then(initDB)
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
