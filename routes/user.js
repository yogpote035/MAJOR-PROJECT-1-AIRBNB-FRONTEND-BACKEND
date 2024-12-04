const express = require("express");
const router = express.Router();   // { mergeParams: true }
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");


router.route("/signup")
    .get(userController.GetSignupForm)
    .post(wrapAsync(userController.GetSignupFormResponse))


router.route("/login")
    .get(userController.getLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }), userController.getLoginFormResponse)



router.get("/logout", userController.LogoutUser)
module.exports = router;