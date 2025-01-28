import express from 'express';
import { afternoons2_2 } from '../controllers/2_2afternoonsController.js';

const router = express.Router();

router.get('/all', afternoons2_2);


export default router;
