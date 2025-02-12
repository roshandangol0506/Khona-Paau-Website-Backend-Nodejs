const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function restrictToLoggedinAdminOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.redirect("/adminlogin");
  }
  const user = getUser(userUid);
  if (!user || user.role !== "admin") {
    return res.redirect("/adminlogin");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = await getUser(userUid);
  req.user = user || null;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  restrictToLoggedinAdminOnly,
  checkAuth,
};
