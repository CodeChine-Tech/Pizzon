const RiderLocation = require('../models/RiderLocation');
const safeEmit = require('../utils/socket');

// 1. RIDER UPDATES HIS LOCATION
const updateLocation = async (req, res) => {
  try {
    const { orderId, latitude, longitude } = req.body;

    // rider ID comes from JWT token (req.user)
    const riderId = req.user._id;

    // Find existing location record or create new one
    let location = await RiderLocation.findOne({
      rider: riderId,
      order: orderId
    });

    if (location) {
      // Update existing location
      location.latitude = latitude;
      location.longitude = longitude;
      location.isActive = true;
      await location.save();
    } else {
      // Create new location record
      location = await RiderLocation.create({
        rider: riderId,
        order: orderId,
        latitude,
        longitude
      });
    }

    // 🔥 Fire Socket.io — broadcast location to everyone watching
    safeEmit(req, 'rider_location_update', {
      orderId,
      riderId,
      latitude,
      longitude,
      message: 'Rider location updated'
    });

    res.status(200).json({
      message: 'Location updated successfully',
      location
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. GET RIDER LOCATION FOR A SPECIFIC ORDER
const getRiderLocation = async (req, res) => {
  try {
    const location = await RiderLocation.findOne({
      order: req.params.orderId,
      isActive: true
    }).populate('rider', 'name');

    if (!location) {
      return res.status(404).json({ message: 'Rider location not found' });
    }

    res.status(200).json({
      message: 'Location fetched successfully',
      location
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. RIDER MARKS HIMSELF AS INACTIVE (order delivered)
const deactivateLocation = async (req, res) => {
  try {
    const { orderId } = req.body;
    const riderId = req.user._id;

    await RiderLocation.findOneAndUpdate(
      { rider: riderId, order: orderId },
      { isActive: false }
    );

    // Notify everyone rider is done
    safeEmit(req, 'rider_offline', {
      orderId,
      riderId,
      message: 'Rider has delivered the order'
    });

    res.status(200).json({ message: 'Rider marked as inactive' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  updateLocation,
  getRiderLocation,
  deactivateLocation
};