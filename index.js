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
const apiRouter = require("./routes/auth");
const revenueRouter = require("./routes/revenue");
const main = require("./routes/main");
const setupGoogleAuth = require("./controllers/googleauth");
const cors = require("cors");

const { connectTomongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const app = express();

const PORT = 8001;

connectTomongoDB("mongodb://localhost:27017/faau").then(() =>
  console.log("Connected to MongoDB")
);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8001/auth/google/callback",
  ],
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/faau",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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
app.use("/", main);
app.use("/api", apiRouter);
app.use("/", revenueRouter);

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/uploads", express.static(path.resolve("./uploads")));
app.use("/items", express.static(path.resolve("./items")));
app.use("/profileImage", express.static(path.resolve("./profileImage")));
app.use("/reviews", express.static(path.resolve("./reviews")));
app.use("/gmailprofile", express.static(path.resolve("./gmailprofile")));
app.listen(PORT, () => console.log(`PORT: ${PORT}`));
