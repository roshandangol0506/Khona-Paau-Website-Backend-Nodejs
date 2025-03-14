const REVIEW = require("../modules/review");

// async function handleGenerateNewReview(req, res) {
//   try {
//     const { name, review, profilepic } = req.body;
//     await REVIEW.create({
//       name,
//       review,
//       profilepic,
//     });
//     return res.redirect("/");
//   } catch (error) {
//     return res.render("uploadreview", {
//       error: "An error occurred during uploading Review",
//     });
//   }
// }

async function handleGenerateNewReview(req, res) {
  try {
    const { name, review, profilepic } = req.body;
    const newreview = await REVIEW.create({
      name,
      review,
      profilepic,
    });

    return res.status(201).json({
      message: "Review added successfully",
      team: newreview,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add Review" });
  }
}

module.exports = { handleGenerateNewReview };
