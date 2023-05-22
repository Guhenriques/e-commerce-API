const client = require('../db');

const index = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  client.query('SELECT * FROM cart WHERE user_id = $1', [userId], (error, results) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const show = (req, res, next) => {
  const id = parseInt(req.params.id);

  client.query('SELECT * FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ error: 'Cart item not found' });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  });
};

const create = (req, res, next) => {
  const { user_id, product_id, quantity } = req.body;

  client.query(
    'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id',
    [user_id, product_id, quantity],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        res.status(201).json({ id: results.rows[0].id });
      }
    }
  );
};

const update = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { product_id, quantity } = req.body;

  client.query(
    'UPDATE cart SET product_id = $1, quantity = $2 WHERE id = $3',
    [product_id, quantity, id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        if (results.rowCount === 0) {
          res.status(404).json({ error: 'Cart item not found' });
        } else {
          res.status(200).json({ message: `Cart item modified with ID: ${id}` });
        }
      }
    }
  );
};

const destroy = (req, res, next) => {
  const id = parseInt(req.params.id);
  // check if the value parsed is a integer or not
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  client.query('DELETE FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      next(error);
    } else if (results.rowCount === 0) {
      res.status(404).json({ error: 'Cart item not found' });
    } else {
      res.status(200).json({ message: `Cart item deleted with ID: ${id}` });
    }
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
