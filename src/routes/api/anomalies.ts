import express, { Request, Response } from 'express';
import { query } from '../../db';

const router = express.Router();

// GET /api/anomalies
router.get('/', async (req: Request, res: Response) => {
    const { threshold_temp, threshold_humidity } = req.query;

    // Default thresholds if not provided
    const tempThreshold = threshold_temp ? Number(threshold_temp) : 50; // Example: 50°C
    const humidityThreshold = threshold_humidity ? Number(threshold_humidity) : 90; // Example: 90%

    try {
        const queryText = `
            SELECT *
            FROM sensor_data
            WHERE temperature > $1 OR humidity > $2
            ORDER BY time ASC;
        `;
        const params = [tempThreshold, humidityThreshold];

        const result = await query(queryText, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching anomalies:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

export default router;
