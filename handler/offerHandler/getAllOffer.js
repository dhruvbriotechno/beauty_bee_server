const Offer = require("../../models/offer");

async function GetAllOffersHandler(req, res) {
  try {
    // Query the database to retrieve all offer
    const offer = await Offer.find();

    // Send the offer as a response
    res.status(200).json({ offer });
  } catch (error) {
    console.error("Error fetching offer:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = GetAllOffersHandler;
