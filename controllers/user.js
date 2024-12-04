const User = require("../models/user");

module.exports.GetSignupForm = (request, response) => {
    response.render("users/signup.ejs")
}


module.exports.GetSignupFormResponse = async (request, response, next) => {
    try {
        let { username, email, password } = request.body;
        let newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        request.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            request.flash("success", "successfully registered");
            response.redirect("/listings")
        })

        console.log(newUser);
    } catch (error) {
        request.flash("error", error.message);
        response.redirect("/signup");
    }

}


module.exports.getLoginForm = (request, response) => {
    response.render("users/login.ejs")
}


module.exports.getLoginFormResponse = async (request, response) => {
    request.flash("success", "welcome to Airbnb");

    let redirectUrl = response.locals.redirectUrl || "/listings";
    response.redirect(redirectUrl);
}


module.exports.LogoutUser = (request, response, next) => {
    request.logOut((err) => {
        if (err) {
            next(err);
        }
        request.flash("success", "your are logged out!");
        response.redirect("/listings");
    });
}