import mongoose, { Schema, Document, Model } from 'mongoose';

interface IJob extends Document{
    location: string;
    title: string;
    listingDate: Date;
    category: string;
    description: string;
    remote: 'Remote' | 'Hybrid' | 'On-site';
    company: string;
    skillsNeeded: string[];
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior' | 'Executive';
    salaryRange?: string; 
    applicationDeadline?: Date; 
    contactInformation?: string; 
    jobID: string; //Custom job listing number
}

const JobSchema: Schema<IJob> = new Schema(
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

const Job = Model<IJob> = mongoose.model<IJob>('Job', JobSchema)
export default Job