import Project from "../models/projects"

export const createProject = async (req, res) => {
    const {title, description, image, link } = req.body;
    try {
        const newProject = new Project({title, description, image, link, createdBy: req.user.id});
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};

// Get all Projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("createdBy", "name");
        res.json(projects);
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
};
// Get project by Id
export const getProjectById = async (req, res) => {
    try {
        const project =await Project.findById(req.params.id).populate("createdBy", "firstname");
        if (!project) return res.status(404).json({message: "Project not found"});

        res.json(project)
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

// Update a project
export const updateProject = async (req, res) => {
    const {title, description, image, link } = req.body
    try{
        const updatedProject = await Project.findByIdAndUpdate(req.params, {title, description, image, link}, {new: true});
        if (!updatedProject) return res.status(404).json({message: "Project not found"});

        res.json(updatedProject)
    } catch(error) {
        res.status(500).json({message: "Server Error"});
    }
};

// Delete a project

export const deleteProject = async (req, res) => {
    try{
        const deletedProject =await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({message: "Project not found"});

        res.json({message: "Project Deleted"});
    }catch(error) {
        res.status(500).json({message: "Server Error"});
    }
};