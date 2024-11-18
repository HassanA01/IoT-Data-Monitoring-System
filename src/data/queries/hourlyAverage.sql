/* 
  Define the query using pgtyped syntax:
  `@name` gives the query a name for type generation
  `:parameter` defines input parameters
*/

-- @name GetHourlyAverage
SELECT time_bucket('1 hour', time) AS bucket, 
       sensor_id, 
       AVG(temperature) AS avg_temp
FROM sensor_data
WHERE time >= :start_time AND time <= :end_time
GROUP BY bucket, sensor_id
ORDER BY bucket, sensor_id;
