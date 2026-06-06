import jdService from "./jd.service.js";

const getRoleInsightController = async (req, res, next) => {
    try {

        const { role } = req.query;

        const insights = await jdService.getRoleInsight(role);

        return res.status(200).json({
            success: true,
            insights
        });

    } catch (error) {
        next(error);
    }
};

export default {
    getRoleInsightController
};