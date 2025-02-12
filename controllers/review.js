const REVIEW = require("../modules/review");

async function handleGenerateNewReview(req, res) {
  try {
    const { name, review, profilepic } = req.body;
    await REVIEW.create({
      name,
      review,
      profilepic,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("uploadreview", {
      error: "An error occurred during uploading Review",
    });
  }
}

module.exports = { handleGenerateNewReview };
