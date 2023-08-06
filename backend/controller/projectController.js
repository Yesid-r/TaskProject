import Project from "../models/Project.js";
import User from "../models/User.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, status, dateEnd } = req.body;
        console.log(req.params.userId)
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
        } else {
            const newProject = new Project({
                name,
                description,
                dateEnd,
                user: req.params.userId
            });
            const projectSaved = await newProject.save();
            res.status(201).json({ success: true, message: "Project created successfully", data: projectSaved });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.params.userId });
        res.status(200).json({ success: true, message:"succesfully search",data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        res.status(200).json({ success: true, message:"succesfully search",data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// export const updateProject = async (req, res) => {
//     try {
//         const project = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
//         res.status(200).json({ success: true, message:"succesfully updated",data: project });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }