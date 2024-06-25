const Slider = require("../../models/slider");
const fs = require("fs");
const path = require("path");

async function UpdateSliderHandler(req, res) {
  try {
    const { sliderid, title } = req.body;

    // Find the slider by ID
    const slider = await Slider.findById(sliderid);
    if (!slider) {
      return res.status(200).json({ message: "Slider not found", status: false });
    }

    // Update Slider properties if provided
    if (title) slider.title = title;

    // Check if a new image file is provided
    if (req.file) {
      // Get the old image path
      const oldImageUrl = slider.image;
      console.log("Old Image URL:", oldImageUrl);

      // Convert URL to file system path
      const oldImagePath = path.join(__dirname, "../../uploads", path.basename(oldImageUrl));
      console.log("Converted Old Image Path:", oldImagePath);

      // Update the slider image path with the new file path
      // slider.image = `/uploads/${req.file.filename}`;
      slider.image = `http://localhost:5000/uploads/${req.file.filename}`;
      console.log("New Image Path:", slider.image);

      // Delete the old image file
      if (oldImageUrl && fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      } else {
        console.log("Old image does not exist or path is incorrect");
      }
    }

    // Save the updated slider
    await slider.save();

    res.status(200).json({ message: "Slider updated successfully", status: true });
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = UpdateSliderHandler;

