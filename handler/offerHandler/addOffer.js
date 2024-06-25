
const Offer = require("../../models/offer");

async function AddOfferHandler(req, res) {
  try {
    const {
      title,
      description,
      percentage
    } = req.body;

    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    // Check if Offer with provided title already exists
    const existingOffer = await Offer.findOne({ title });
    if (existingOffer) {
      return res
        .status(200)
        .json({ message: `'${title}' Offer already exists`, status: false });
    }

    // If Offer doesn't exist, create a new Offer
    const offer = new Offer({
      image,
      title,
      description,
      percentage
    });
    await offer.save();
    res.status(200).json({ message: 'Offer added successfully', status: true });
  } catch (error) {
    console.error('Error adding Offer:', error);
    res.status(500).json({ message: 'Something went wrong', status: false });
  }
}

module.exports = AddOfferHandler;
