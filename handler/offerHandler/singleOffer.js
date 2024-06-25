const Offer = require("../../models/offer");

async function getOfferByIdHandler(req, res) {
  try {
    const offerId = req.query.offerId;

    // Find offer by ID
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(200).json({ message: "Offer not found", status: false });
    }

    res.status(200).json({ offer, status: true });
  } catch (error) {
    console.error("Error getting offer by ID:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = getOfferByIdHandler;
