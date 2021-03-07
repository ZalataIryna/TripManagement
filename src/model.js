const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripSchema = new Schema({
  from: {
    name: {
      type: String,
      required: true,
    },
  },
  to: {
    name: {
      type: String,
      required: true,
    },
  },
});

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
