const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    image: String,
    title: { type: String, required: true, unique: true },
    description: String,
    percentage: Number
   
});

const Offer = mongoose.model("offer", offerSchema);

module.exports = Offer;
