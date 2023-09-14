const router = require('express').Router();
const Sequelize = require('sequelize');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

// get all blog posts for homepage
router.get("/", async (req, res) => {
  console.log("homepage route hit")
  try {
    res.render("homepage", {});
  } catch (error) {
    console.error("Error rendering homepage:", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;