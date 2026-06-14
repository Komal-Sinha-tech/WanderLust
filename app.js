if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    console.log("Running in development mode");
}


// Require all packages
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError");

const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Connection to DB
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

// Session
const sessionOptions = {
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Root route
app.get("/", (req, res) => {
    res.send("hi, I am root");
});

// Demo user route
// app.get("/demouser", async (req, res) => {

//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "student",
//     });

//     let registeredUser = await User.register(fakeUser, "helloWorld");

//     res.send(registeredUser);
// });

// Routes connect
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong" } = err;

    res.status(status).render("listings/error.ejs", { err });
});

// Server confirmation
app.listen(8080, () => {
    console.log("server is running on port 8080");
});