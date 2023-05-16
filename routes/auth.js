/*const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

*/