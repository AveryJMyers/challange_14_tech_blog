const router = require('express').Router();
const Sequelize = require('sequelize');
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

// get one blog posts for homepage
router.get('/', async (req, res) => {
  console.log('homepage route hit')
  try{
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      limit: 2,
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    console.log(blogPosts)
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  }catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', async (req,res) => {
  console.log('login route hit')
  try{
    res.render('login',{
      username: req.session.username,
      logged_in: req.session.logged_in,
    })
  }catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;