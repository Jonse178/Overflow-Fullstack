const fs = require('fs').promises;
const path = require('path');
const cuid = require('cuid');

const db = require('./db');

const blogFile = path.join(__dirname, '/blogs.json');

module.exports = {
    list,
    create,
    remove
};

//Declare Schema of mongo document
const Blog = db.model('Blogs', {
    _id: { type: String, default: cuid},
    blogName: { type: String, required:true},
    blogSnippet: { type: String, required:true},
    blogBody: {type: String, required: true}
})

async function list(opts = {}) {
    const { offset = 0, limit = 25 } = opts;
    blog = await Blog.find().sort({ _id:1}).skip(offset).limit(limit);
    return blog;
    
}

async function create(fields) {
    const blog = await new Blog(fields).save();
    return blog;
}

async function remove( _id ){
    await Product.deleteOne( { _id });
}

