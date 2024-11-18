# IoT Data Monitoring System

## **Overview**
The **IoT Data Monitoring System** is a project that simulates real-time monitoring of temperature and humidity data from multiple IoT sensors. It is designed to explore and demonstrate the benefits of using **TimescaleDB** for time-series data storage and querying, alongside a **TypeScript backend** for building scalable and efficient APIs.

This project is an opportunity to learn practical skills in backend development, time-series database management, and real-time data aggregation.

---

## **Purpose**
1. **Practical Experience**:
   - Learn and apply **TimescaleDB** features like hypertables, compression, and continuous aggregates.
2. **Build Expertise**:
   - Gain hands-on experience integrating a time-series database with a **TypeScript backend**.
3. **Simulate Real-World Scenarios**:
   - Work with realistic IoT data and simulate ingestion, aggregation, and anomaly detection.

---

## **Features**
- **Real-Time Sensor Data**:
  - Simulates the ingestion of temperature and humidity data from multiple IoT sensors.
- **Time-Series Database**:
  - Uses **TimescaleDB** for efficient storage, querying, and aggregation of time-series data.
- **Continuous Aggregates**:
  - Automatically precomputes hourly averages and summaries for faster querying.
- **TypeScript Backend**:
  - A robust API built with **Express** and type-safe querying using tools like `pgtyped` and `zod`.
- **Scalability**:
  - Supports large datasets with features like chunking, compression, and scheduled policies.

---

## **Project Structure**
```
IoT-Data-Monitoring-System/
│
├── src/
│   ├── routes/                # API route handlers
│   ├── db.ts                  # Database connection logic
│   ├── queries/               # SQL query files
│   └── types/                 # TypeScript interfaces and types
│
├── doc/                       # Documentation files
│   └── ProjectDocumentation.pdf
│
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
└── README.md                  # Project overview
```

---

## **Getting Started**

### **1. Prerequisites**
- **Node.js** (v16+)
- **PostgreSQL** with TimescaleDB extension
- **npm** or **yarn**

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/IoT-Data-Monitoring-System.git
   cd IoT-Data-Monitoring-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables in the `.env` file:
   ```
   PGPASSWORD=your_password
   PGUSER=your_user
   PGDATABASE=your_database
   PGHOST=your_host
   PGPORT=your_port
   PGSSLMODE=require
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## **Documentation**
For detailed information about the project's API endpoints, SQL schema, and queries, refer to the documentation located in the `doc` folder:
```
doc/ProjectDocumentation.pdf
```

---

## **Future Improvements**
- Add a frontend dashboard (e.g., React with Chart.js or D3.js) for data visualization.
- Integrate Grafana for advanced visualization and alerting.
- Extend the backend to support more complex data transformations and analytics.

---

## **Author**
**Aneeq Hassan**  
This project is part of a personal learning initiative to explore the capabilities of TimescaleDB and backend development with TypeScript.
