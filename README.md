
# OVERVIEW :-
This project implements a high-throughput, reliable Job Scheduler capable of executing scheduled HTTP jobs with minimal drift and full execution tracking.
The system supports job creation, modification, execution history tracking, and failure alerting, as required in the assignment.
# Key Features:-

Create scheduled jobs using a CRON expression (with seconds support)

Modify existing jobs without restarting the system

Execute HTTP POST requests automatically

Track and persist job execution history

Detect failures and generate alerts

Priority-queue–based scheduling to minimize time drift

At-least-once execution semantics

# System Architecture:-
Client
  |
  v
Express API Layer
  |
  v
Service Layer
  |
  v
Scheduler Engine
  |
  v
Priority Queue (Min-Heap)
  |
  v
Worker
  |
  v
External API
  |
  v
SQLite Database
  |
  v
Alerts

# Components:-

API Layer: Exposes REST endpoints for job and alert management

Scheduler: Continuously evaluates upcoming jobs using a priority queue

Worker: Executes HTTP requests asynchronously

Database: Persists jobs, executions, and alerts

Alerts Module: Captures and exposes job failure information

# Data Flow:
Client creates a job using the Create Job API

Job metadata is stored in the database
   
Scheduler inserts the job into a priority queue based on next execution time

Worker executes the job at the scheduled time

Execution metadata is persisted

On failure, an alert is generated and stored

Job is rescheduled based on CRON expression

 # API Design:
1.Create Job
POST /jobs


Request Body

{
  "schedule": "*/10 * * * * *",
  "api": "http://localhost:3000/test"
}


Response

{
  "jobId": "uuid"
}

2️. Modify Job
PUT /jobs/:jobId


Request Body

{
  "schedule": "*/3 * * * * *",
  "api": "http://localhost:3000/test"
}


Response

{
  "message": "Job updated successfully"
}

3️. Get Job Executions
GET /jobs/:jobId/executions


Response

[
 {
    "execution_time": 1766835200993,
    "status_code": 200,
    "duration_ms": 512,
   "success": 1
  }
]

4️. Get Alerts
GET /alerts


Response

[
  {
    "job_id": "uuid",
    "status_code": 500,
    "message": "Job execution failed",
    "time": 1766835400123
  }
]

# How to Run the Project:-
Steps:-
git clone https://github.com/ashishSoni1234/job-scheduler.git
cd job-scheduler
npm install
npm run dev
Server starts at:
http://localhost:3000
Then for  api testing , we can simply use VS code Thunder Client , to test method like POST, PUT , GET etc.
