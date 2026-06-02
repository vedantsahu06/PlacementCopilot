import express from 'express';

import upload from '../../middlewares/upload.middleware.js';

const router = express.Router();


router.post('/upload',upload.single("resume"), (req,res) => {
    // console.log(req.file);
    res.status(200).json({
        status: 'success',
        message: 'Resume uploaded successfully',
    });
})

export default router;

