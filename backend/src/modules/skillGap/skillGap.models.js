import mongoose from "mongoose";

const skillGapRoadmapSchema = new mongoose.Schema ({
//need to store this
    // {
//   _id,

//   resumeId,

//   jdMatchId,

//   role,

//   criticalSkills: [],

//   importantSkills: [],

//   optionalSkills: [],

//   roadmap: {
//     role,
//     estimatedDuration,
//     roadmap: [...],
//     finalOutcome
//   },

//   createdAt
// }
    resumeId:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Resume"
            },
            role:{
                type: String,
                required: true
            },
            jdMatchId:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "jdMatch"
            },
            criticalSkills:{
                type:[String],
                // required: true
            },
            importantSkills:{
                type:[String],
            
            },
            optionalSkills:{
                type:[String],
            },
            roadmap:{
                type: Object,
                // required: true
            }
},{
    timestamps: true


})

export const SkillGapRoadmap = mongoose.model('SkillGapRoadmap', skillGapRoadmapSchema);