const User = require("../Models/user.js")

module.exports.signupForm =  (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
      let { username, password, email } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){return next(err)}
        req.flash("success", "user registered");
        res.redirect("/listings");
      })
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    console.log("Login successful, sending response...");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

module.exports.logout = (req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are logged out!")
    res.redirect("/listings")

  })
}