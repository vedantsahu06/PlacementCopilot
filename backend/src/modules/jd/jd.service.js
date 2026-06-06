import {RawJD} from '../resume/resume.models.js';
import {RoleInsight} from "./jd.model.js";

const getRoleInsight = async (role) => {
    const totalJDs = await RawJD.countDocuments({ role: role.trim().toLowerCase() });

    const skillFrequency = await RawJD.aggregate([
        {
            $match:{role: role.trim().toLowerCase()}
        },
        {
            $unwind: "$normalizedSkills"
        },
        {
            $group:{
                _id: "$normalizedSkills",
                count: { $sum: 1 },
                
            }

        },
        {
            $sort: { count: -1 }
        }
    ])

    const result = skillFrequency.map((skill) => ({
    skill: skill._id,
    count: skill.count,
    frequency: Number(
        ((skill.count / totalJDs) * 100).toFixed(2)
    ),
    totalJDs
}));

    const roleInsight = new RoleInsight({
        role: role.trim().toLowerCase(),
        insights: {
            skillFrequency: result
        }
    });
    await roleInsight.save();
    return result;
}

export default {
    getRoleInsight
}