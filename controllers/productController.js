// 1. Import Product model
const Product = require('../models/Product');

// 2. GET ALL PRODUCTS - anyone can view
const getProducts = async (req, res) => {
  try {
    // Fetch all products from database
    const products = await Product.find();

    res.status(200).json({
      message: 'Products fetched successfully',
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. CREATE PRODUCT - Admin only
const createProduct = async (req, res) => {
  try {
    const { name, description, sizes } = req.body;

    // Create new product in database
    const product = await Product.create({
      name,
      description,
      sizes
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. UPDATE PRODUCT - Admin only
const updateProduct = async (req, res) => {
  try {
    // Find product by ID and update it
    // { new: true } means return the UPDATED version
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. DELETE PRODUCT - Admin only
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 6. TOGGLE AVAILABILITY - Admin only
const toggleAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Flip true to false or false to true
    product.available = !product.available;
    await product.save();

    res.status(200).json({
      message: `Product is now ${product.available ? 'available' : 'unavailable'}`,
      product
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 7. Export all functions
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleAvailability
};