import express, { Request, Response } from 'express';
import { query } from '../../db';

const router = express.Router();

// GET sensor readings for each day for each sensor_id. Users can pass in a start and end time to fetch the reading
// activity from a certain range.
router.get('/daily-readings', async (req: Request, res: Response) => {
    const { start_time, end_time } = req.query;

    try {
        const queryText = `
            SELECT time_bucket('1 day', time) AS day, 
                   sensor_id, 
                   COUNT(*) AS readings
            FROM sensor_data
            WHERE ($1::timestamptz IS NULL OR time >= $1)
              AND ($2::timestamptz IS NULL OR time <= $2)
            GROUP BY day, sensor_id
            ORDER BY day, sensor_id;
        `;
        const params = [start_time || null, end_time || null];

        const result = await query(queryText, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching daily aggregates:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

// GET /api/sensors/:sensor_id
router.get('/:sensor_id', async (req: Request, res: Response): Promise<void> => {
    const { sensor_id } = req.params;
    const { start_time, end_time } = req.query;

    if (!start_time || !end_time) {
        res.status(400).json({ success: false, message: 'start_time and end_time are required' });
        return;
    }

    try {
        const queryText = `
            SELECT *
            FROM sensor_data
            WHERE sensor_id = $1 AND time >= $2 AND time <= $3
            ORDER BY time ASC;
        `;
        const params = [sensor_id, start_time, end_time];

        const result = await query(queryText, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});


export default router;
