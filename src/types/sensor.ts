export interface SensorData {
    time: Date;
    sensor_id: number;
    temperature: number | null;
    humidity: number | null;
}

export type SensorDataInput = Omit<SensorData, 'time'> & {
    time?: Date;
};