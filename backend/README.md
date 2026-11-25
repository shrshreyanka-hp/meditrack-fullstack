# MediTrack Backend

A Node.js, Express.js, and Mongoose API for the MediTrack application.

## Requirements

- Node.js 18 or newer
- MongoDB Atlas or local MongoDB

## Install

```bash
cd backend
cp .env.example .env
npm install
```

Edit `backend/.env` and set `MONGODB_URI` to a MongoDB connection string.

## Run locally

```bash
cd backend
npm run dev
```

The API will normally start at `http://localhost:5000`.

## Test

```bash
cd backend
npm test
```

## Health check

```text
GET http://localhost:5000/api/health
```

The existing `index.html` frontend is not modified or served by this backend.
