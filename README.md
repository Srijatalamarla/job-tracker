# Job Tracker
Track all your job applications status at one place.

## Tech Stack
* **Frontend:** React, Tailwind CSS, Framer Motion
* **Backend:** Spring Boot
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)

## Features
- Add, edit and delete jobs
- Status tracking - track at which stage you are in the hiring pipeline

## Prerequisites
Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16+)
* [JDK](https://www.oracle.com/java/technologies/downloads/) (v17 or higher recommended)
* [Maven](https://maven.apache.org/download.cgi)
* [PostgreSQL](https://www.postgresql.org/download/)

## Configuration
Navigate to `backend/src/main/resources/application.properties` and update:
- `spring.datasource.password`: Your PostgreSQL password.
- `jwt.secret`: A custom secret key for security.


## Local Setup
**Step 1:** Fork this repository and clone it

**Step 2:** Navigate to root folder 'job-tracker'

**Step 3:** Backend setup
```
cd backend
mvn clean install
mvn spring-boot:run
```

The server is available at "http://localhost:8080"

**Step 4:** Frontend setup
```
cd frontend
npm install
npm run dev
```

The app is available at "http://localhost:5173"
