import {RoleInsight} from "../jd/jd.model.js";
import {Analyser} from "../resume/resume.model.js";

const getRoadmap = async (req, res, next) => {
    const { role } = req.body;
    const roleInsight = await RoleInsight.findOne({ role: role.trim().toLowerCase() });
    if (!roleInsight) {
        return res.status(404).json({
            success: false,
            message: "Role insights not found for the specified role"
        });
    }
    const { insights } = roleInsight;
}