require("dotenv").config();
const passport = require("passport");
const User = require("../modules/user");
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
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            const profileImageUrl = profile.photos[0].value;

            const response = await axios.get(profileImageUrl, {
              responseType: "arraybuffer",
            });

            const filename = `${Date.now()}-${uuidv4()}.jpg`;

            const folderPath = path.join(__dirname, "..", "gmailprofile");
            const filePath = `D:/Practice/gmailprofile/${filename}`;

            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }

            fs.writeFileSync(filePath, response.data);

            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              profile: filename,
            });
            await user.save();
          }

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
        res.redirect("http://localhost:3000/");
      } catch (error) {
        console.error("Error in Google callback:", error);
        res.redirect("/auth");
      }
    }
  );
}

module.exports = setupGoogleAuth;
