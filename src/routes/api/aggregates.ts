import express, { Request, Response } from 'express';
import { query } from '../../db';

const router = express.Router();

// GET hourly average across all sensors
router.get('/hourly-average', async (req: Request, res: Response) => {
    const { start_time, end_time } = req.query;

    try {
        const queryText = `
            SELECT bucket,
                   AVG(avg_temp) AS overall_avg_temp
            FROM avg_temperature_hourly
            WHERE bucket >= $1 AND bucket <= $2
            GROUP BY bucket
            ORDER BY bucket ASC;
        `;
        const params = [start_time, end_time];
        const result = await query(queryText, params);

        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching hourly averages across sensors:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

// 2. Hourly Average for Specific Sensors
router.get('/hourly-average/sensors', async (req: Request, res: Response) => {
    const { start_time, end_time } = req.query;

    try {
        const queryText = `
            SELECT bucket, sensor_id, avg_temp
            FROM avg_temperature_hourly
            WHERE bucket >= $1 AND bucket <= $2
            ORDER BY bucket ASC, sensor_id ASC;
        `;
        const params = [start_time, end_time];
        const result = await query(queryText, params);

        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching hourly averages for sensors:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

// GET hourly sensor readings (Temperature and Humidity)
router.get('/sensor-readings/hourly', async (req: Request, res: Response) => {
    const { start_time, end_time } = req.query;

    try {
        const queryText = `
            SELECT bucket, sensor_id, avg_temperature, avg_humidity
            FROM sensor_readings_hourly
            WHERE bucket >= $1 AND bucket <= $2
            ORDER BY bucket ASC, sensor_id ASC;
        `;
        const params = [start_time, end_time];
        const result = await query(queryText, params);

        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching hourly sensor readings:', error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

export default router;
