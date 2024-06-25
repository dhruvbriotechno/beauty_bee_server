const Offer = require("../../models/offer");
const fs = require("fs");
const path = require("path");

async function UpdateOfferHandler(req, res) {
  try {
    const { offerid, title, description, percentage } = req.body;

    // Find the offer by ID
    const offer = await Offer.findById(offerid);
    if (!offer) {
      return res.status(200).json({ message: "Offer not found", status: false });
    }

    // Update Offer properties if provided
    if (title) offer.title = title;
    if (description) offer.description = description;
    if (percentage) offer.percentage = percentage;

    // Check if a new image file is provided
    if (req.file) {
      // Get the old image path
      const oldImageUrl = offer.image;
      console.log("Old Image URL:", oldImageUrl);

      // Convert URL to file system path
      const oldImagePath = path.join(__dirname, "../../uploads", path.basename(oldImageUrl));
      console.log("Converted Old Image Path:", oldImagePath);

      // Update the offer image path with the new file path
      // offer.image = `/uploads/${req.file.filename}`;
      offer.image = `http://localhost:5000/uploads/${req.file.filename}`;
      console.log("New Image Path:", offer.image);

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

    // Save the updated offer
    await offer.save();

    res.status(200).json({ message: "Offer updated successfully", status: true });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = UpdateOfferHandler;






// const Offer = require("../../models/offer");

// async function UpdateOfferHandler(req, res) {
//   try {
//     // const offerId = req.params.id; // Assuming the offer ID is passed in the request parameters
//     const {offerid, image, title, description, percentage} = req.body;
// // console.log("offerId",req.params)
//     // Find the offer by ID
//     const offer = await Offer.findById(offerid);
//     if (!offer) {
//       return res.status(200).json({ message: "Offer not found", status: false });
//     }

//     // Update Offer properties if provided
//     if (image) offer.image = image;
//     if (title) offer.title = title;
//     if (description) offer.description = description;
//     if (percentage) offer.percentage = percentage;

//     // Save the updated offer
//     await offer.save();

//     res.status(200).json({ message: "Offer updated successfully", status: true });
//   } catch (error) {
//     console.error("Error updating offer:", error);
//     res.status(500).json({ message: "Something went wrong", status: false });
//   }
// }

// module.exports = UpdateOfferHandler;
