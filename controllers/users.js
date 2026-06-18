const User = require("../models/user.js");


 module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser = async(req,res,next)=>{
try{
     let {username,email,password}=req.body;
    const newUser = new User ({ username,email});
    const registeredUser = await  User.register (newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
       if(err){
           return  next(err);
        }
         req.flash("success","user was registered!");
        res.redirect("/listings");
    });
} catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
    }

}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}


 module.exports.loginUser = (req, res) => {
    req.flash("success", "Welcome to WanderLust!");

    const redirectUrl = res.locals.redirectUrl || "/listings";

    delete req.session.redirectUrl;

    res.redirect(redirectUrl);
};

  module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return  next();
        }
        req.flash("success","You are logged out successfully!");
        res.redirect("/listings");
    })
}

