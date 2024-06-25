const Slider = require("../../models/slider");


async function AddSliderHandler(req, res) {
  try {
    const { title } = req.body;
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
    // Check if Slider with provided title already exists
    const existingSlider = await Slider.findOne({ title });
    if (existingSlider) {
      return res.status(200).json({ message: `'${title}' Slider already exists`, status: false });
    }

    // If Slider doesn't exist, create a new Slider
    const slider = new Slider({
      title,
      image,
    });
    await slider.save();
    res.status(200).json({ message: 'Slider added successfully', status: true });
  } catch (error) {
    console.error('Error adding Slider:', error);
    res.status(500).json({ message: 'Something went wrong', status: false });
  }
}

module.exports = AddSliderHandler;


