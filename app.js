if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override")
const listingsRouter = require("./routes/listing.js"); // import all listing from router
const reviewRouter = require("./routes/review.js"); // import all reviews from router
const UserRouter = require("./routes/user.js"); // import all login and signup from router
const User = require("./models/user.js"); // import user login/signup schema
const ExpressError = require("./utils/ExpressError.js");
const path = require("path");
const app = express();
const port = 3000;
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/images")));
app.set("view engine", "ejs");

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log('connected to DB');
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log('error in mongo store');
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }

};




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((request, response, next) => {
    response.locals.success = request.flash("success");
    response.locals.error = request.flash("error");
    response.locals.currentUser = request.user;
    // console.log(response.locals.success);
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", UserRouter);

// all path except define
app.all("*", (request, response, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// custom error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
})

app.listen(port, () => {
    console.log(`server is started at Port ${port}`);
})