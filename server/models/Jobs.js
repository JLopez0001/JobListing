import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const JobSchema = new Schema(
    {
        location: { type: String, required: true },
        title: { type: String, required: true },
        listingDate: { type: Date, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        remote: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], required: true },
        company: { type: String, required: true },
        skillsNeeded: { type: [String], required: true },
        employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
        experienceLevel: { type: String, enum: ['Entry-level', 'Mid-level', 'Senior', 'Executive'], required: true },
        salaryRange: { type: String },
        applicationDeadline: { type: Date },
        contactInformation: { type: String }
    },
    { timestamps: true }
)

export default mongoose.model('jobs', JobSchema)
