import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 200,
    },
    status: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completada'],
        default: 'Pendiente'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date:{
        type: Date,
        default: Date.now

    },
    dateEnd:{
        type: Date,
        required: true,
    },

}, { timestamps: true });
export default mongoose.model("Project", projectSchema);