import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { validateEnteredInfo } from './test/validations';

dotenv.config({path: '.env'}) // read environment variables
const app = express(); // initialize Express
app.use(express.json());
const myClient = new PrismaClient();

// CRUD operations

// Main route
app.get("/", (_req, res) => {
    res.send(
        `<h1 style = "text-align: center;">Blog API</h1>`
    );
})

// POST /users(all users)
app.post("/users", validateEnteredInfo, async (req, res) => {
    try{
        const {firstName, lastName, emailAddress} = req.body
        const newUser = await myClient.user.create({
            data: {
                firstName,
                lastName,
                emailAddress
            }
        })
    } catch (e) {
        res.status(400).json({ message: "Something Went Wrong!😓" })
    }
});

// PORT configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`The App is listening on port ${port}`);
})