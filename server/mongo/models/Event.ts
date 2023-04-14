const mongoose = require('mongoose');

// Define Mongoose schema for Event
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timeAndDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

// Create Mongoose model for Event
export const Event = mongoose.model('Event', eventSchema);