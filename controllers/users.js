const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(results.rows, null, 2));
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = async (request, response) => {
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
    [name, email, hashedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
    [name, email, hashedPassword, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};


const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}

