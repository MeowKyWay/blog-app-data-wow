# Blog App – Development Setup

This project includes two main components:

- **Backend**: NestJS app located in `nest-blog-app/`
- **Frontend**: Next.js app located in `next-blog-app/`
- **Database**: PostgreSQL via Docker

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MeowKyWay/blog-app-data-wow.git
cd blog-app-data-wow
```

### 2. Copy Environment Variables

Copy .env_example files to .env in both nest-blog-app/ and next-blog-app/ directories:
```bash
cp nest-blog-app/.env_example nest-blog-app/.env && cp next-blog-app/.env_example next-blog-app/.env
```
Edit the .env files as needed for your local setup.

### 3. Build and Start Services with Docker Compose

Run the following command from the root directory to build and start all services:
```bash
docker compose up -d --build
```
This will:
-	Start PostgreSQL on port 5432  
-	Start the NestJS backend on port 3001  
-	Start the Next.js frontend on port 3000  

### 4. Verify Services
-	**Frontend**: http://localhost:3000  
-	**Backend (API)**: http://localhost:3001  
-	**Database**: PostgreSQL running on localhost:5432  
