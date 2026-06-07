import generateRoadmap from "../../ai/prompts/roadmapGenerator.prompt.js";

const getRoadmap = async (role, criticalSkills, importantSkills, optionalSkills, knownSkills) => {
    return await generateRoadmap(role, criticalSkills, importantSkills, optionalSkills, knownSkills);
};

export default {
    getRoadmap
};