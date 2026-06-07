import {JDMatch} from "../resume/resume.models.js";
import { RoleInsight } from "../jd/jd.model.js";
import generateRoadmap from "../../ai/prompts/roadmapGenerator.prompt.js";
import {SkillGapRoadmap} from "./skillGap.models.js"


const SkillGapAnalysis = async (role, resumeId) => {
    // console.log(resumeId);

    const analysis = await JDMatch.find({ resumeId });

    // console.log(JSON.stringify(analysis, null, 2));

    if (analysis.length === 0) {
        throw new Error("Analysis not found for the given resume ID");
    }

    const roleInsight = await RoleInsight.findOne({
        role: role.trim().toLowerCase()
    });

    if (!roleInsight) {
        throw new Error("Role insight not found for the given role");
    }

     const missingSkills = [];

    for (const item of analysis) {

        // Skip invalid documents safely
        if (
            item?.matchResult &&
            Array.isArray(item.matchResult.missingSkills)
        ) {
            missingSkills.push(
                ...item.matchResult.missingSkills
            );
            // console.log(...item.matchResult.missingSkills);
        }
    }
    const matchedSkills = new Set();
    for (const item of analysis) {

        // Skip invalid documents safely
        if (
            item?.matchResult &&
            Array.isArray(item.matchResult.matchedSkills)
        ) {
            matchedSkills.add(
                ...item.matchResult.matchedSkills
            );
            
        }
    }
    for (let i=0; i<missingSkills.length; i++){
        missingSkills[i] = missingSkills[i].trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        
    }
    const uniqueMissingSkills = [...new Set(missingSkills)];
    console.log("Unique Missing Skills:", uniqueMissingSkills);

    const criticalSkills = [];
    const importantSkills = [];
    const optionalSkills = [];

    for (const skill of uniqueMissingSkills) {
        roleInsight.insights.skillFrequency.forEach((insight) => {
            if (insight.skill === skill) {
                if (insight.frequency >= 80) {
                    criticalSkills.push(skill);
                    
                } else if (insight.frequency >= 50) {
                    importantSkills.push(skill);

                } else {
                    optionalSkills.push(skill);
                }
            }
        });
    }
    
    const roadmap = await generateRoadmap(role, criticalSkills, importantSkills, optionalSkills, [...matchedSkills]);

    const result = new SkillGapRoadmap({
        resumeId,
        role,
        jdMatchId: analysis[0]._id,
        criticalSkills,
        importantSkills,
        optionalSkills,
        roadmap

    })
    await result.save();
    return {
        criticalSkills,
        importantSkills,
        optionalSkills,
        roadmap
    };
};

export default {
    SkillGapAnalysis
}
