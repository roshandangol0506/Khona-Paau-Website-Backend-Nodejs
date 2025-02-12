function checkGoogleAuth(req, res, next) {
  console.log("User authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

module.exports = { checkGoogleAuth };
