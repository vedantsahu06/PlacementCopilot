import skillGapService from "./skillGap.service.js";

async function getSkillGap(req, res, next) {
    const { id } = req.params;
    const { role } = req.body;
    const skillGapAnalysis = await skillGapService.SkillGapAnalysis(role, id);
    res.status(200).json({
        success: true,
        skillGapAnalysis
    });
}

export default {
    analyseSkillGapController: getSkillGap
}