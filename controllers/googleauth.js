require("dotenv").config();
const passport = require("passport");
const User = require("../modules/user"); // Adjust the path as needed
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

function setupGoogleAuth(app) {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8001/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the database
          let user = await User.findOne({ email: profile.emails[0].value });

          // If user doesn't exist, create a new one
          if (!user) {
            const profileImageUrl = profile.photos[0].value;

            // Download the profile image
            const response = await axios.get(profileImageUrl, {
              responseType: "arraybuffer",
            });

            // Generate a unique filename
            const filename = `${Date.now()}-${uuidv4()}.jpg`;

            // Define the folder and file path
            const folderPath = path.join(__dirname, "..", "gmailprofile");
            const filePath = `D:/Practice/gmailprofile/${filename}`;

            // Ensure the folder exists
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }

            // Save the image to disk
            fs.writeFileSync(filePath, response.data);

            // Create the user
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              profile: filePath, // Save the file path
            });
            await user.save();
          }

          // Pass the user object to serializeUser
          done(null, user);
        } catch (error) {
          console.error("Error handling Google login:", error);
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth" }),
    async (req, res) => {
      try {
        const sessionId = uuidv4();
        setUser(sessionId, req.user);
        res.cookie("uid", sessionId, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
        res.redirect("/");
      } catch (error) {
        console.error("Error in Google callback:", error);
        res.redirect("/auth");
      }
    }
  );
}

module.exports = setupGoogleAuth;
