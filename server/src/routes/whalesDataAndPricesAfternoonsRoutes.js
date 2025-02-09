import express from 'express';
import { getAllWhalesAndPricesData, getPaginatedWhalesAndPricesData, updateByIdWhalesAndPricesData } from '../controllers/whalesDataAndPricesAfteroons.js';

const router = express.Router();

router.get('/all', getAllWhalesAndPricesData);
router.get('/paginated', getPaginatedWhalesAndPricesData);
router.put("/update/:id", updateByIdWhalesAndPricesData);


export default router;
