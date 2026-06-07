import analysisReportService from "./analysisReport.services.js";

async function getAnalysisReport(req, res, next) {
    const { id } = req.params;
    try {
        const report = await analysisReportService.analysisReport(id);
        res.status(200).json({
            success: true,
            report
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getAnalysisReport
}