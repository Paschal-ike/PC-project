import BlogPost from "..models/BlogPost.js"

// Create a new blog post

export const createBlogPost = async (req, res) => {
    const {title, content, image} = req.body

    try {
        const newBlogPost = new BlogPost({title, content, image, createdBy: req.user.id});
        await newBlogPost.save()
        res.status(201).json(newBlogPost);
    } catch(error) {
        res.status(500).json({message: "Server Error"});
    }
};

// Get all blog post
export const getBlogPosts = async (req, res) =>{
    try {

        const blogPosts = await BlogPost.find().populate("createdBy", "name");
        res.json(blogPosts)
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

// Get blog post by Id
export const getBlogPostById = async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate("createdBy", "name");
        if (!blogpost) {
            return res.status(404).json({message: "Blog Post not found"});
        }
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

// Update blog post
export const updateBlogPost = async (req, res) => {
    const {title, content, image} = req.body
    try {
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, {title, content, image}, {new: true});
        if (!updatedBlogPost) return res.status(404).json({message: "Blog Post not found"});

        res.json(updatedBlogPost);   
    } catch(error) {
        res.status(500).json({message: "Server Error"});
    }
};


// Delete Blog Post

export const deleteBlogPost = async (req, res) => {
    try{
        const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) return res.status(404).json({message: "Blog not found"})

        res.json({message: "Blog Post has been deleted"});
    } catch(error){
        res.status (500).json({message: "Server Error"});
    }
};