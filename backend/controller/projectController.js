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