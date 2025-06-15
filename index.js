import express from 'express';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';

dotenv.config({path: '.env'}) // read environment variables
const app = express(); // initialize Express
app.use(express.json());
// const myClient = new PrismaClient();

// CRUD operations

// Main route
app.get("/", (_req, res) => {
    res.send(
        `<h1 style = "text-align: center;">Blog API</h1>`
    );
})

// PORT configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`The App is listening on port ${port}`);
})