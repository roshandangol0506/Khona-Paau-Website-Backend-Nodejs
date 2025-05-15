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

async function handleGetAdmin(req, res) {
  try {
    const admin = await Admin.findOne().select(
      "-password -_id -createdAt -updatedAt"
    );
    if (!admin) {
      return res.status(400).json({ error: "Cannot Find Admin" });
    }
    res.status(200).send({ success: true, msg: "Get Success", data: admin });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Admin" });
  }
}

async function handleEditAdmin(req, res) {
  try {
    const { name, username, email, phoneno } = req.body;

    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(400).json({ error: "Cannot Find Admin" });
    }
    if (name) admin.name = name;
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (phoneno) admin.phoneno = phoneno;

    await admin.save();
    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update Admin" });
  }
}

async function handleChangeUserPassword(req, res) {
  try {
    const {
      currentPassword,
      newPassword,
      twoFactorialAuthentication,
      sessionManagement,
    } = req.body;

    const admin = await Admin.findOne();
    if (!admin) {
      console.log("admin not found");
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.password !== currentPassword) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    if (newPassword) admin.password = newPassword;
    if (twoFactorialAuthentication)
      admin.twoFactorialAuthentication = twoFactorialAuthentication;
    if (sessionManagement) admin.sessionManagement = sessionManagement;
    await admin.save();

    return res
      .status(200)
      .json({ message: "Admin password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Failed to update Admin password" });
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
  handleGetAdmin,
  handleEditAdmin,
  handleChangeUserPassword,
};
