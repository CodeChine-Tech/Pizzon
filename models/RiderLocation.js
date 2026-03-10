const mongoose = require('mongoose');

const riderLocationSchema = new mongoose.Schema(
  {
    // Which rider is this location for
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Which order is the rider delivering
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },

    // Rider's current location
    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    // Is rider currently active/delivering?
    isActive: {
      type: Boolean,
      default: true
    }
  },

  { timestamps: true }
);

const RiderLocation = mongoose.model('RiderLocation', riderLocationSchema);
module.exports = RiderLocation;