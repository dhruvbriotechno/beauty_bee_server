const Slider = require("../../models/slider");

async function getSliderByIdHandler(req, res) {
  try {
    const sliderId = req.query.sliderId;

    // Find slider by ID
    const slider = await Slider.findById(sliderId);
    if (!slider) {
      return res.status(200).json({ message: "Slider not found", status: false });
    }

    res.status(200).json({ slider, status: true });
  } catch (error) {
    console.error("Error getting slider by ID:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = getSliderByIdHandler;
