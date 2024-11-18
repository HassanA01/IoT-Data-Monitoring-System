import random
import csv
from datetime import datetime, timedelta


# configuration for dataset
NUM_ROWS = 2500000
NUM_SENSORS = 50
START_TIME = datetime(2024, 1, 1)
TIME_INCREMENT = timedelta(seconds=1) 

OUTPUT_FILE = 'sensor_dataset.csv'

# the dataset will have <NUM_ROWS> rows, <NUM_SENSORS> sensors, and will start the time from from Jan 1, 2024 
# and each row will be 1 second later.

def generate_sensor_dataset():
    '''
    Generates a csv dataset with <NUM_ROWS> rows of sensor data. The data is randomly generated and will
    consist of columns: time, sensor_id, temperature (in Celcius), humidity (in percentage %).
     
    Note that the dataset will NOT consist of a header row.
    '''
    currTime = START_TIME

    with open(OUTPUT_FILE, 'w', newline='') as file:
        writer = csv.writer(file)

        for _ in range(NUM_ROWS):
            sensor_id = random.randint(1, NUM_SENSORS)
            temperature = round(random.uniform(-10, 40.0), 2)
            humidity = round(random.uniform(0, 100), 2) 
            writer.writerow([currTime.isoformat(), sensor_id, temperature, humidity])

            currTime += TIME_INCREMENT

if __name__ == "__main__":
    generate_sensor_dataset()