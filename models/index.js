const blogPost = require('./blogPost')
const comment = require('./comment')
const user = require('./user')

user.hasMany(blogPost, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})

blogPost.belongsTo(user, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})

user.hasMany(comment, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})
blogPost.hasMany(comment, {
    foreignKey: 'associatedPost',
    onDelete: 'CASCADE'
})

comment.belongsTo(user, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
})
comment.belongsTo(blogPost, {
    foreignKey: 'associatedPost',
    onDelete: 'CASCADE'
})

module.exports = { 
    user, 
    blogPost, 
    comment 
}