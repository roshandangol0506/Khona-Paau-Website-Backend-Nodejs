const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const userRouter = require("./routes/user");
const teamRouter = require("./routes/team");
const serviceRouter = require("./routes/service");
const mycartRouter = require("./routes/mycart");
const checkoutRouter = require("./routes/checkout");
const reviewRouter = require("./routes/review");
const staticRouter = require("./routes/staticRouter");
const viewuserRouter = require("./routes/viewuser");
const uploadRouter = require("./routes/uploadProfileImage");
const main = require("./routes/main");
const setupGoogleAuth = require("./controllers/googleauth");

const { connectTomongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const app = express();

const PORT = 8001;

connectTomongoDB("mongodb://localhost:27017/faau").then(() =>
  console.log("Connected to MongoDB")
);

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/faau",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

setupGoogleAuth(app);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "publics")));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use(
  "/profileImage",
  express.static("C:/Users/DeLL/OneDrive/Desktop/Practice/profileImage")
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/", teamRouter);
app.use("/", serviceRouter);
app.use("/", mycartRouter);
app.use("/", checkoutRouter);
app.use("/", reviewRouter);
app.use("/", staticRouter);
app.use("/url", viewuserRouter);
app.use("/", uploadRouter);

app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass `req.user` to all views
  next();
});

app.use("/uploads", express.static(path.resolve("./uploads")));
app.use("/items", express.static(path.resolve("./items")));
app.use("/profileImage", express.static(path.resolve("./profileImage")));
app.use("/reviews", express.static(path.resolve("./reviews")));
app.use("/gmailprofile", express.static(path.resolve("./gmailprofile")));
app.listen(PORT, () => console.log(`PORT: ${PORT}`));
