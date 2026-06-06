import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    originalFileName: {
      type: String,
      required: true,
    },

    resumeData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);

const analyserSchema = new mongoose.Schema(
    {
        resumeId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Resume"
        },
        role:{
            type: String,
            required: true
        },
        analysisResult:{
            type: Object,
            required: true
        }
    },
    {
        timestamps: true

    }
)


const JDMatchSchema = new mongoose.Schema({
    resumeId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,},
    company:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    matchResult:{
        type: Object,
        required: true
    }
    
},{
    timestamps: true
})


const rawJDSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    rawJD:{
        type: String,
        required: true
    },
    extracetedSkills:{
    type: [String],
    required: true
    },
    normalizedSkills:{
    type: [String],
    required: true
    }
    // responsibilities:{
    //     type: [String],
        
    // },
    // qualifications:{
    //     type: [String],
    //     required: true
    // }

})

export const Analyser = mongoose.model("Analyser", analyserSchema);
export const JDMatch = mongoose.model("JDMatch", JDMatchSchema);
export const RawJD = mongoose.model("RawJD", rawJDSchema);

export default Resume;
 