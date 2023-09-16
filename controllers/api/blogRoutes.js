const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

// Get all blog posts for homepage

router.get('/', async (req, res) => {
    try {
      const blogData = await BlogPost.findAll();
      const blog = blogData.map((blog) => {
        return blog.get({ plain: true });
      });
  
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  });

router.post('/', async (req, res) => {
  try{
    const {title, content} = req.body;

    const newPost = await BlogPost.create({
      title,
      content,
      user_id: req.session.user_id,
    });
    return res.status(200).json(newPost);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
    


module.exports = router;