const sequelize = require("../config/connection");
const {
    User,
    blogPost,
    Comment,
} = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    try{
        await User.bulkCreate(userData)
        console.log("----------------User seeded----------------")
        await blogPost.bulkCreate(blogPostData)
        console.log("----------------Blog Post seeded----------------")
        await Comment.bulkCreate(commentData)
        console.log("----------------Comment seeded----------------")
    } catch (err) {
        console.log(err)
    }finally {
        await sequelize.close()
    }
}

seedDatabase();