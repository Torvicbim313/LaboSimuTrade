import express from 'express';
import { getAllWhalesAndPricesData, getPaginatedWhalesAndPricesData } from '../src/controllers/whalesDataAndPrices.js';

const router = express.Router();

router.get('/all', getAllWhalesAndPricesData);
router.get('/paginated', getPaginatedWhalesAndPricesData);

export default router;
