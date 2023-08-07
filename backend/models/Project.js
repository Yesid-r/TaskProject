import mongoose from "mongoose";
import moment from 'moment';


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
    dateStart:{
        type: Date,
        required: true,

    },
    dateEnd:{
        type: Date,
        required: true,
    },

}, { timestamps: true });

projectSchema.pre('save', async function (next) {
    try {
        const now = new Date();
        this.dateStart = moment.utc(this.dateStart).toDate();
        this.dateEnd = moment.utc(this.dateEnd).toDate();
        next();
    } catch (error) {
        next(error);
    }
});

// Organiza los hooks usando mongoose-hook-organizer
// projectSchema.plugin(organizer);



export default mongoose.model('Project', projectSchema);