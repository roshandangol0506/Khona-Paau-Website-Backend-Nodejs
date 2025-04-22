const REVIEW = require("../modules/review");

async function handleGetReviewLength(req, res) {
  try {
    const review = await REVIEW.find();
    if (!review) {
      return res.status(404).json({ error: "Cannot Find Review" });
    }
    const reviewlength = review.length;
    res
      .status(200)
      .send({ success: true, msg: "Get Success", data: reviewlength });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Review" });
  }
}

async function handleGetSpecificReview(req, res) {
  try {
    const { review_id } = req.params;

    const review = await REVIEW.findById(review_id);

    if (!review) {
      return res.status(404).json({ error: "Cannot Find Review" });
    }
    res.status(200).send({ success: true, msg: "Get Success", data: review });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Fetch Review" });
  }
}

async function handleGenerateNewReview(req, res) {
  try {
    const { name, review, profilepic, rating } = req.body;
    console.log(rating);
    const newreview = await REVIEW.create({
      name,
      review,
      profilepic,
      rating,
    });

    return res.status(201).json({
      message: "Review added successfully",
      team: newreview,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add Review" });
  }
}

async function handleDeleteReviews(req, res) {
  try {
    const { review_id } = req.params;
    const review = await REVIEW.findByIdAndDelete(review_id);
    if (!review) {
      return res.status(404).json({ error: "Cannot Find Review" });
    }
    return res.status(200).json({ message: "Review Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Delete Review" });
  }
}

async function handleEditReview(req, res) {
  try {
    const { review_id } = req.params;
    const { name, review, rating } = req.body;

    console.log("photo file:", req.file);

    console.log("name", name);
    console.log("rating", rating);
    console.log("review", review);
    // if any

    const Review = await REVIEW.findById(review_id);
    if (!Review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (name) Review.name = name;
    if (review) Review.review = review;
    if (rating) Review.rating = rating;

    await Review.save();

    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update Review" });
  }
}
module.exports = {
  handleGetSpecificReview,
  handleGenerateNewReview,
  handleDeleteReviews,
  handleEditReview,
  handleGetReviewLength,
};
