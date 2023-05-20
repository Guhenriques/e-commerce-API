const { Pool } = require('pg');
const pool = new Pool();

// Get all products
const getProducts = async (request, response) => {
  try {
    const query = 'SELECT * FROM products';
    const { rows } = await pool.query(query);
    response.json(rows);
  } catch (error) {
    console.error('Error retrieving products:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
const getProductById = async (request, response) => {
  const productId = parseInt(request.params.id);

  try {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await pool.query(query, [productId]);

    if (rows.length === 0) {
      response.status(404).json({ error: 'Product not found' });
    } else {
      response.json(rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving product:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new product
const createProduct = async (request, response) => {
  const { name, price, description } = request.body;

  try {
    const query = 'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING id';
    const { rows } = await pool.query(query, [name, price, description]);
    const newProductId = rows[0].id;
    response.status(201).json({ id: newProductId, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product
const updateProduct = async (request, response) => {
  const productId = parseInt(request.params.id);
  const { name, price, description } = request.body;

  try {
    const query = 'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4';
    await pool.query(query, [name, price, description, productId]);
    response.json({ message: `Product with ID ${productId} updated successfully` });
  } catch (error) {
    console.error('Error updating product:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product
const deleteProduct = async (request, response) => {
  const productId = parseInt(request.params.id);

  try {
    const query = 'DELETE FROM products WHERE id = $1';
    await pool.query(query, [productId]);
    response.json({ message: `Product with ID ${productId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting product:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
