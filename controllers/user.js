const User = require("../modules/user");
const Admin = require("../modules/admin");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.render("signup", {
        error: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "User with this email already exists.",
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const sessionId = uuidv4();
    setUser(sessionId, newUser);
    res.cookie("uid", sessionId);

    return res.redirect("/");
  } catch (error) {
    return res.status(500).render("signup", {
      error: "An error occurred. Please try again later.",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid username or Password",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, { ...user.toObject(), role: user.role });
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.render("adminlogin", {
      error: "Invalid username or Password",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, { ...admin.toObject(), role: admin.role });
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

async function handleAdminSignup(req, res) {
  const { name, email, password } = req.body;
  await Admin.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  console.log("User logged out.");
  res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleAdminSignup,
  handleUserLogin,
  handleAdminLogin,
  handleUserLogout,
};
