const fs = require("fs");
const path = require("path");
const TEAM = require("../modules/team");
const SERVICE = require("../modules/service");
const REVIEW = require("../modules/review");

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

module.exports = {
  handleimage,
};
