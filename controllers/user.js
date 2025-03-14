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
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const sessionId = uuidv4();
  setUser(sessionId, { ...user.toObject(), role: user.role });
  res.cookie("uid", sessionId, { httpOnly: true, secure: false });
  return res.status(200).json({ message: "Login successful" });
}

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, { ...admin.toObject(), role: admin.role });
  res.cookie("uid", sessionId, { httpOnly: true, secure: false });
  return res.status(200).json({ message: "Login successful" });
}

// async function handleAdminSignup(req, res) {
//   const { name, email, password } = req.body;
//   await Admin.create({
//     name,
//     email,
//     password,
//   });
//   return res.redirect("/");
// }

async function handleAdminSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newAdmin = await Admin.create({ name, email, password });

    return res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.status(200).json({ message: "Logged out Successfully" });
}

module.exports = {
  handleUserSignup,
  handleAdminSignup,
  handleUserLogin,
  handleAdminLogin,
  handleUserLogout,
};
