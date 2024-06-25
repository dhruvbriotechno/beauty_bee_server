const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect('mongodb+srv://mahipatbriotechno:PJgEBQHWi537FC63@cluster0.w8em8m0.mongodb.net/beauty_bee_server');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectToDB;
