import resumeService from "./resume.service.js";

async function uploadResume(req, res, next) {

    const text =
        await resumeService.uploadResume(
            req.file
        );

    res.status(200).json({
        success: true,
        text
    });
}

async function getResumeBy_Id(req, res, next) {
    const { id } = req.params;
    const resume = await resumeService.getResumeById(id);
    res.status(200).json({
        success: true,
        resume
    });
}

async function analyseResume(req, res, next) {
        const { id } = req.params;
        const { role } = req.body;
        const analysis = await resumeService.analyseResumeFunc(id,role);
        res.status(200).json({
            success: true,
            analysis
        });
}

async function matchJob(req, res, next) {
    const {id} = req.params;
    const {JD}= req.body;
    const {company} =  req.body;
    const matchResult = await resumeService.matchJobFunc(id,JD,company);
    res.status(200).json({
        success: true,
        matchResult
    });


}

async function getMatches(req,res,next){
    const {id} = req.params;
    const result = await resumeService.getMatchesFunc(id);
    res.status(200).json({
        success: true,
        result
    });
}
export default {
    uploadResume,
    getResumeBy_Id,
    analyseResume,
    matchJob,
    getMatches
};