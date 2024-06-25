require('dotenv').config();
const express = require("express");
const connectToDB = require("./connection/db");
const registrationHandler = require("./handler/authHandler/registration");
const loginHandler = require("./handler/authHandler/login");


const AddSliderHandler = require("./handler/sliderHandler/addSlider");
const GetAllSlidersHandler = require("./handler/sliderHandler/getAllSlider");
const UpdateSliderHandler = require("./handler/sliderHandler/updateSlider");
const deleteSliderHandler = require("./handler/sliderHandler/deleteSlider");
const getSliderByIdHandler = require("./handler/sliderHandler/singleSlider");


const cors = require('cors');


const AddOfferHandler = require('./handler/offerHandler/addOffer');
const GetAllOffersHandler = require('./handler/offerHandler/getAllOffer');
const UpdateOfferHandler = require('./handler/offerHandler/updateOffer');
const deleteOfferHandler = require('./handler/offerHandler/deleteOffer');
const getOfferByIdHandler = require('./handler/offerHandler/singleOffer');
const upload = require('./config/multerConfig');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ======================

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToDB();

// Route to use registration
app.post("/registration", registrationHandler);
app.post("/login", loginHandler);
// app.post("/adminLogin", adminLoginHandler);

// Slider 
app.post('/addSlider', upload.single('image'), AddSliderHandler);
// app.post("/addSlider", AddSliderHandler);
app.get("/sliders", GetAllSlidersHandler);
app.put('/updateSlider', upload.single('image'), UpdateSliderHandler);
// app.put('/updateSlider', UpdateSliderHandler);
app.delete("/deleteSlider", deleteSliderHandler);
app.get("/singleSlider", getSliderByIdHandler);

// Offer 
app.post('/addOffer', upload.single('image'), AddOfferHandler);
app.put('/updateOffer', upload.single('image'), UpdateOfferHandler);
// app.put('/updateOffer', UpdateOfferHandler);
app.get("/offers", GetAllOffersHandler);
app.delete("/deleteOffer", deleteOfferHandler);
app.get("/singleOffer", getOfferByIdHandler);




app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server Running",
    status: true,
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// note : when employee api done after add task in pass employee id to get to empName