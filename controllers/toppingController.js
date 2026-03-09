const Topping = require('../models/Topping');

// 1. GET ALL TOPPINGS - anyone can view
const getToppings = async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.status(200).json({
      message: 'Toppings fetched successfully',
      count: toppings.length,
      toppings
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. CREATE TOPPING - Admin only
const createTopping = async (req, res) => {
  try {
    const { name, price } = req.body;
    const topping = await Topping.create({ name, price });
    res.status(201).json({
      message: 'Topping created successfully',
      topping
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. UPDATE TOPPING - Admin only
const updateTopping = async (req, res) => {
  try {
    const topping = await Topping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.status(200).json({
      message: 'Topping updated successfully',
      topping
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. DELETE TOPPING - Admin only
const deleteTopping = async (req, res) => {
  try {
    const topping = await Topping.findByIdAndDelete(req.params.id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.status(200).json({ message: 'Topping deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. TOGGLE AVAILABILITY - Admin only
const toggleToppingAvailability = async (req, res) => {
  try {
    const topping = await Topping.findById(req.params.id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    topping.available = !topping.available;
    await topping.save();
    res.status(200).json({
      message: `Topping is now ${topping.available ? 'available' : 'unavailable'}`,
      topping
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getToppings,
  createTopping,
  updateTopping,
  deleteTopping,
  toggleToppingAvailability
};