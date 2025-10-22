import express from 'express';
import protect from '../middlewares/authMiddlewares.js';
import { enhanceDescription, enhanceSummary, uploadResume } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum',protect,enhanceSummary );
aiRouter.post('/enhance-job-desc',protect,enhanceDescription );
aiRouter.post('/upload-resume',protect,uploadResume );

export default aiRouter;