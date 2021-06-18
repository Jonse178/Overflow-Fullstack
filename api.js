const Blog = require('./blog');

module.exports = {
    listBlog,
    createBlog,
    deleteBlog
};

async function listBlog(req, res, next) {
    const { offset = 0, limit = 25 } = req.query;
    
    Blog.list({ offset: Number(offset), limit: Number(limit) })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });

}

async function createBlog (req, res, next) {

    Blog.create(req.body)
        .then((result) => {
            console.log(result);
            res.redirect("./blog.html");
        })
        .catch((err) => {
            next(err);
        }
    )
};   

async function deleteBlog (req, res, next) {
    Blog.remove(req.params.id)
        .then((result) => {
            console.log(result);
            res.redirect("./blog.html");
        })
        .catch((err) => {
            next(err);
        })
}