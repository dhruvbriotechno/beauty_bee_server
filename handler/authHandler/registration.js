const User = require("../../models/user");

async function registrationHandler(req, res) {
  try {
    const { email, password} = req.body;
    
    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: `The user already registered`, status: false });
    }

    // If user doesn't exist, create a new user
    const user = new User({ email, password });
    await user.save();
    res
      .status(200)
      .json({ message: "Registration successfully", status: true });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = registrationHandler;
