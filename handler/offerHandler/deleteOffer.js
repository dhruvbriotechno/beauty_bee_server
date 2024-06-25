const Offer = require("../../models/offer");
const fs = require("fs");
const path = require("path");

async function deleteOfferHandler(req, res) {
  try {
    // Extract the offer ID from the request parameters
    const offerId = req.query.offerid;
    console.log("offerId", offerId);

    // Check if the offer exists
    const existingOffer = await Offer.findById(offerId);
    if (!existingOffer) {
      return res.status(200).json({ message: "Offer not found", status: false });
    }

    // Get the path to the image file
    const imagePath = path.join(__dirname, "../../uploads", path.basename(existingOffer.image));
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

    // Delete the offer record from the database
    await Offer.findByIdAndDelete(offerId);

    res.status(200).json({ message: "Offer deleted successfully", status: true });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = deleteOfferHandler;





// const Offer = require("../../models/offer");

// async function deleteOfferHandler(req, res) {
//   try {
//     // Extract the offer ID from the request parameters
//     const offerId = req.query.offerid;
// console.log("offerId",offerId)
//     // Check if the offer exists
//     const existingOffer = await Offer.findById(offerId);
//     if (!existingOffer) {
//       return res.status(200).json({ message: "Offer not found", status: false });
//     }

//     // If the Offer exists, delete it
//     await Offer.findByIdAndDelete(offerId);
//     res.status(200).json({ message: "Offer deleted successfully", status: true });
//   } catch (error) {
//     console.error("Error deleting Offer:", error);
//     res.status(500).json({ message: "Something went wrong", status: false });
//   }
// }

// module.exports = deleteOfferHandler;
