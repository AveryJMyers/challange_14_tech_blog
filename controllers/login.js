const express = require("express");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

// Adjust the path to your User model
const User = require("../models").User;

const router = express.Router();

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { username: username } });

    const id = user.dataValues.id;

    console.log("id " + id);
    const now = dayjs();

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.save(() => {
        req.session.user_id = id;
        req.session.logged_in = true;
        req.session.username = user.username;
        req.session.last_logged = now;
        console.log("user id " + req.session.user_id + " logged in " + req.session.logged_in + " username " + req.session.username);
        res.redirect(`/boards`); // Redirect to associated page
      });// Store user ID in session
      console.log("user id " + req.session.user_id + " logged in " + req.session.logged_in + " username " + req.session.username);
      

    } else {
      res.render("login", { error: "Invalid credentials" }); // Display error message
    }
  } catch (error) {
    res.render("login", { error: "An error occurred" }); // Display error message

  }
});


//to signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    });
    console.log(userData);
    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res.redirect(`/boards`); // Redirect to associated page
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// to logout
router.post('/logout', (req, res) => {
  console.log("is this happening")
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      // confirm that user by name has been logged out in console
      req.session.logged_in = false; // Set logged_in to false
      console.log('User logged out:', req.session.user_id);
      res.redirect('/'); // Redirect to homepage
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
