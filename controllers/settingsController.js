const GlobalSettings = require('../models/GlobalSettings');

// 1. GET SETTINGS
const getSettings = async (req, res) => {
  try {
    // findOne gets the single settings document
    let settings = await GlobalSettings.findOne();

    // If no settings exist yet, create default ones
    if (!settings) {
      settings = await GlobalSettings.create({
        taxRate: 0.10,
        deliveryFee: 2.99,
        priceMultiplier: 1.0
      });
    }

    res.status(200).json({
      message: 'Settings fetched successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. UPDATE SETTINGS - Admin only
const updateSettings = async (req, res) => {
  try {
    const { taxRate, deliveryFee, priceMultiplier } = req.body;

    // findOne and update, if doesn't exist create it
    let settings = await GlobalSettings.findOne();

    if (!settings) {
      settings = await GlobalSettings.create({
        taxRate,
        deliveryFee,
        priceMultiplier
      });
    } else {
      // Update existing settings
      if (taxRate !== undefined) settings.taxRate = taxRate;
      if (deliveryFee !== undefined) settings.deliveryFee = deliveryFee;
      if (priceMultiplier !== undefined) settings.priceMultiplier = priceMultiplier;
      await settings.save();
    }

    res.status(200).json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getSettings, updateSettings };