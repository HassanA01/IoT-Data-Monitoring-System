import express, { Request, Response } from 'express';
import { query } from '../../db';
import { hourlyAverageArraySchema } from '../../schemas';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { sensor_id, start_time, end_time } = req.query;

    try {
        const queryText = `
            SELECT time_bucket('1 hour', time) AS bucket,
                   AVG(temperature) AS avg_temp
            FROM sensor_data
            WHERE time >= $1 AND time <= $2
            ${sensor_id ? 'AND sensor_id = $3' : ''}
            GROUP BY bucket
            ORDER BY bucket;
        `;
        const params = [start_time, end_time];
        if (sensor_id) params.push(sensor_id);

        const result = await query(queryText, params);

        const validatedData = hourlyAverageArraySchema.parse(result.rows);

        res.json({ success: true, data: validatedData });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            res.status(400).json({ success: false, errors: error.errors });
        } else {
            console.error('Error fetching hourly averages:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default router;
