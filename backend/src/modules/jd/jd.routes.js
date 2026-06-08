import express from "express";
import jdController from "./jd.controller.js";
import {asyncHandler} from "../../utils/asyncHandler.js";


const router = express.Router();

router.get('/insights', asyncHandler(jdController.getRoleInsightController));
export default router;