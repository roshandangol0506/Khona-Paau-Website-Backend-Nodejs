const fs = require("fs");
const path = require("path");
const TEAM = require("../modules/team");
const SERVICE = require("../modules/service");
const REVIEW = require("../modules/review");
const Checkout = require("../modules/checkout");

async function handleimage(req, res) {
  const uploadDir = path.resolve("./uploads");
  let allteams = await TEAM.find({});
  let allservices = await SERVICE.find({ visible: "on" });
  let allreviews = await REVIEW.find({});

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Unable to scan directory:", err);
      return res.status(500).send("Unable to scan directory");
    }

    const images = files.filter((file) => {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    });

    res.render("main", {
      images: images,
      team: allteams,
      service: allservices,
      review: allreviews,
      path: path,
      user: req.user,
    });
  });
}

async function handlegetteams(req, res) {
  let allteams = await TEAM.find({});

  res.status(200).send({ success: true, msg: "Post Success", data: allteams });
}

async function handlegetvisibleitems(req, res) {
  let allservices = await SERVICE.find({ visible: "on" });

  res
    .status(200)
    .send({ success: true, msg: "Post Success", data: allservices });
}

async function handlegetallitems(req, res) {
  let allservices = await SERVICE.find({});

  res
    .status(200)
    .send({ success: true, msg: "Post Success", data: allservices });
}

async function handlegetbestSellingproducts(req, res) {
  let allbestSellings = await SERVICE.find({
    best_selling: "true",
    visible: "on",
  });

  res
    .status(200)
    .send({ success: true, msg: "Post Success", data: allbestSellings });
}

async function handlegetreviews(req, res) {
  let allreviews = await REVIEW.find({});

  res
    .status(200)
    .send({ success: true, msg: "Post Success", data: allreviews });
}

async function handleCheckout(req, res) {
  let allservices = await SERVICE.find({});
  let allcheckout = await Checkout.find({ user_id: req.user._id }).populate(
    "service_id"
  );

  res.status(200).send({
    checkout: allcheckout,
    service: allservices,
  });
}

module.exports = {
  handleimage,
  handlegetteams,
  handlegetvisibleitems,
  handlegetallitems,
  handlegetreviews,
  handleCheckout,
  handlegetbestSellingproducts,
};
