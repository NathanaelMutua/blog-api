import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client/extension';

dotenv.config({path: '.env'})

const app = express();

const myClient = new PrismaClient();