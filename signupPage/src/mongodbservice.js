const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/loginSignuptutorial')
  .then(() => {
    console.log('Connected to MongoDB serviceDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB serviceDB', err);
  });

// Define mongoose schema for serviceDB
const serviceSchema = new mongoose.Schema({
  typeofservices: String,
  phoneno: String,
  location: String
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;