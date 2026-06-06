import express from "express";
import jdController from "./jd.controller.js";

const router = express.Router();

router.get('/insights', jdController.getRoleInsightController);
export default router;