import pdfParse from "../../utils/pdfParse.js";
import resumeParserPrompt from "../../ai/prompts/resumeParser.prompt.js";
import Resume from "./resume.models.js";
import {Analyser,JDMatch, RawJD} from "./resume.models.js";
import analyseResume from "../../ai/prompts/resumeAnalyser.prompt.js";
import analyseResumeJD from "../../ai/prompts/resumeJDAnalyser.prompt.js";


function normalizeSkills(skills) {
    for (let i = 0; i < skills.length; i++) {
        skills[i] = skills[i].toLowerCase().trim().replace(/[^a-z0-9]/g, '');;

    }
    return skills;

}

async function uploadResume(file) {

    const text =
        await pdfParse.extractTextFromPDF(
            file.path
        );

    // return text;
    const parsedData = await resumeParserPrompt(text);
    const resume = new Resume({
        originalFileName: file.originalname,
        resumeData: parsedData
    });
    await resume.save();

    return parsedData;

}


async function getResumeById(id) {
    const resume = await Resume.findById(id);   
    if (!resume) {
        throw new Error("Resume not found");
    }
    return resume.resumeData;
}


async function analyseResumeFunc(id,role){

    const resume = await Resume.findById(id);
    if (!resume) {
        throw new Error("Resume not found");
    }

    const resumeData = resume.resumeData;
    const analysis = await analyseResume(role.trim().toLowerCase(),resumeData);
    const analyser = new Analyser({
        resumeId: id,
        role: role.trim().toLowerCase(),
        analysisResult: analysis
    });
    await analyser.save();
    return analysis;


}

async function getAnalysisByResumeId(id){
    const analysis = await Analyser.findOne({resumeId: id});
    if(!analysis){
        throw new Error("Analysis not found for this resume");
    }
    return analysis.analysisResult;
}

async function matchJobFunc(id,JD,company){
    const resumeData = await getAnalysisByResumeId(id);
    const role = resumeData.role.trim().toLowerCase();
    const analysis = await analyseResumeJD(role,resumeData,JD,company);
    const jdMatch = new JDMatch({
        resumeId: id,
        company,
        role: role,
        matchResult: analysis
    });
    await jdMatch.save();

    const normalized = normalizeSkills(analysis.requiredSkills);


    const rawJD = new RawJD({
        company,
        role: role,
        rawJD: JD,
        extracetedSkills: analysis.requiredSkills,
        normalizedSkills: normalized
    })
    await rawJD.save();
    return analysis;



}

async function getMatchesFunc(id){
    const matches = await JDMatch.find({resumeId: id});
    if(!matches){
        throw new Error("No matches found for this resume");
    }
    return matches;

}

export default {
    uploadResume,
    getResumeById,
    analyseResumeFunc,
    matchJobFunc,
    getMatchesFunc
};