const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// ...

// Initialize the Express session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // Serialize user object, typically storing the user ID in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user from the database based on the serialized ID
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});
