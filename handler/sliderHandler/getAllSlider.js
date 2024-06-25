const Slider = require("../../models/slider");

async function GetAllSlidersHandler(req, res) {
  try {
    // Query the database to retrieve all slider
    const slider = await Slider.find();

    // Send the slider as a response
    res.status(200).json({ slider });
  } catch (error) {
    console.error("Error fetching slider:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = GetAllSlidersHandler;
