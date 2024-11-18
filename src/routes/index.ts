import express, { Request, Response } from 'express';
import { query } from '../db'; // Ensure db is correctly imported as a TypeScript module
import hourlyAverages from './api/hourlyAverages';
import sensors from './api/sensors';
import anomalies from './api/anomalies';
import aggregates from './api/aggregates';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the IoT Monitoring API!' });
});

router.get('/test-db', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT NOW()'); // Adjust db.query to query
        res.json({ success: true, time: result.rows[0].now });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

router.use('/api/hourly-averages', hourlyAverages);
router.use('/api/sensors', sensors);
router.use('/api/anomalies', anomalies);
router.use('/api/aggregates', aggregates);


export default router
