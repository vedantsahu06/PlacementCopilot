import Resume,{JDMatch,Analyser,} from "../resume/resume.models.js";
import {RoleInsight} from "../jd/jd.model.js";
import {SkillGapRoadmap} from "../skillGap/skillGap.models.js"


async function analysisReport( resumeId) {
    const analysis = await JDMatch.find({ resumeId });

    if (analysis.length === 0) {
        throw new Error("Analysis not found for the given resume ID");
    }

    const roadmapData = await SkillGapRoadmap.findOne({ resumeId });
    if (!roadmapData) {
        throw new Error("Roadmap not found for the given resume ID");
    }
    const resume = await Resume.findById(resumeId);
    if (!resume) {
        throw new Error("Resume not found");
    }

    
    const result = {
        resumeData: resume.resumeData,
        analysis: analysis.map(item => ({
            company: item.company,
            matchResult: item.matchResult
        })),
        roadmap: roadmapData.roadmap
    }

    return result;
}

export default {
    analysisReport
}