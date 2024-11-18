import { z } from 'zod';

export const hourlyAverageSchema = z.object({
    bucket: z.date(), // Ensure the bucket is a valid datetime string
    avg_temp: z.number(), // Validate that avg_temp is a number
});

export const hourlyAverageArraySchema = z.array(hourlyAverageSchema); // validates multiple rows
