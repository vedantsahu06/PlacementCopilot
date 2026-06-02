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

export default {
    uploadResume
};