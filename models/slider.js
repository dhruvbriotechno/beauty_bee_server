const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    image: String,
    title: { type: String, required: true, unique: true },
});

const Slider = mongoose.model("slider", sliderSchema);

module.exports = Slider;
