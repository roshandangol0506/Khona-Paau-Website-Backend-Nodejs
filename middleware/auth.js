const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = getUser(userUid);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = user;
  next();
}

// async function restrictToLoggedinAdminOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   if (!userUid) {
//     return res.redirect("/adminlogin");
//   }
//   const user = getUser(userUid);
//   if (!user || user.role !== "admin") {
//     return res.redirect("/adminlogin");
//   }
//   req.user = user;
//   next();
// }

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = await getUser(userUid);
  req.user = user || null;
  next();
}

async function checkAuths(req, res) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);

  if (!user) {
    return res.status(200).json({ isAuthenticated: false });
  }

  return res.status(200).json({
    isAuthenticated: true,
    userId: user._id,
    username: user.name,
    email: user.email,
    profile: user.profile ? user.profile : null,
    role: user.role,
  });
}

// Modify restrictToLoggedinAdminOnly middleware
async function restrictToLoggedinAdminOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = getUser(userUid);
  if (!user || user.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  restrictToLoggedinAdminOnly,
  checkAuth,
  checkAuths,
};
