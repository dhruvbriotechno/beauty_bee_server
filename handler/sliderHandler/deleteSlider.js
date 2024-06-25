const Slider = require("../../models/slider");
const fs = require("fs");
const path = require("path");

async function deleteSliderHandler(req, res) {
  try {
    // Extract the slider ID from the request parameters
    const sliderId = req.query.sliderid;
    console.log("sliderId", sliderId);

    // Check if the slider exists
    const existingSlider = await Slider.findById(sliderId);
    if (!existingSlider) {
      return res.status(200).json({ message: "Slider not found", status: false });
    }

    // Get the path to the image file
    const imagePath = path.join(__dirname, "../../uploads", path.basename(existingSlider.image));
    console.log("Image Path:", imagePath);

    // Delete the image file if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        } else {
          console.log("Image file deleted successfully");
        }
      });
    } else {
      console.log("Image file does not exist or path is incorrect");
    }

    // Delete the slider record from the database
    await Slider.findByIdAndDelete(sliderId);

    res.status(200).json({ message: "Slider deleted successfully", status: true });
  } catch (error) {
    console.error("Error deleting slider:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = deleteSliderHandler;

