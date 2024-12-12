# SimuTrade

**SimuTrade** is a monorepo application designed for collecting, simulating, and visualizing financial data. It includes a backend API for data management and a frontend for visualization.

## Features

- **Data Scraping:** Automatically collects financial data daily.
- **Trading Simulation:** Implements and visualizes strategies.
- **REST API:** Provides endpoints for data access.
- **Frontend:** Displays data and graphs (under development).

## Prerequisites

- Node.js v20+
- MySQL 8+
- Environment variables stored in `.env`.

## Configuration

### 1. Clone the Repository

Run the following commands:
```
git clone https://github.com/Rotciv86/simutrade_mySql.git 
cd simutrade
```
### 2. Create a `.env` File

In `server/.env`, define the following variables:

DB_HOST=your-host  
DB_PORT=your-port  
DB_USER=your-username  
DB_PASSWORD=your-password  
DB_NAME=simutrade  

### 3. Install Dependencies

Run these commands:

- At the root level: 
``` 
  npm install
  ```

- In the `server` directory: 
``` 
  cd server  
  npm install
  ```

- In the `client` directory: 
``` 
  cd client  
  npm install
  ```

### 4. Set Up the Database

Run the SQL script in `server/database/init.sql` to create the database and tables.

### 5. Start the Application

Run the backend API:
```
cd server  
npm start
```
Run the frontend client:
```
cd client  
npm start
```
## API Endpoints

- `GET /api/whales-data/all`: Retrieve all records.
- `GET /api/whales-data/paginated?page=X&limit=Y`: Retrieve paginated records.

## Project Structure

simutrade/  
├── server/  
│ ├── app.js  
│ ├── routes/  
│ ├── controllers/  
│ ├── models/  
│ ├── scrapers/  
│ ├── services/  
│ └── database/  
├── client/  
│ ├── public/  
│ ├── src/  
│ └── package.json  
├── .env  
├── .gitignore  
└── README.md

## Contribution

### Fork the Repository

git fork https://github.com/your-username/simutrade.git

### Create a Branch

git checkout -b feature/new-feature

### Commit and Push

git commit -m "Add new feature"  
git push origin feature/new-feature

### Open a Pull Request

Submit a pull request describing your changes.

## Notes

- Use `.gitignore` to exclude sensitive files like `.env`.
- Ensure proper database setup to avoid connection errors.
