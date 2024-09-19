import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { eq } from 'drizzle-orm';
import db from './db/index.js';
import authenticateToken from './middleware.js';
import { users, goals, sleepRecords } from './db/schema.js'
import { comparePassword, createToken, hashPassword, struggleDurationChoices } from './utils.js';

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());

// Signup route
app.post('/api/v1/users/signup', async (req, res) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }
    try {
        const user = await db.select().from(users).where(eq(users.nickname, nickname)).limit(1);
        if (user?.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const [result] = await db.insert(users).values({
            nickname,
            password: hashedPassword
        }).returning({ id: users.id })

        const userId = result.id;

        return res.status(201).json({
            token: createToken(userId),
            user_id: userId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/api/v1/users/login', async (req, res) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }
    try {
        const [user] = await db.select().from(users).where(eq(users.nickname, nickname)).limit(1);
        if (!user) {
            return res.status(400).json({ error: 'nicename or password is incorrect' });
        }

        const hashedPassword = await comparePassword(password, user.password);
        if (!hashedPassword) {
            return res.status(400).json({ error: 'nicename or password is incorrect' });
        }

        return res.status(201).json({
            token: createToken(user.id),
            user_id: user.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get goals route
app.get('/api/v1/goals', async (req, res) => {
    try {
        const result = await db.select().from(goals);
        return res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create Sleep Record route
app.post('/api/v1/sleep_records', authenticateToken, async (req, res) => {
    const { struggle_duration, bed_time, wakeup_time, sleep_duration, sleep_efficiency, goal_id } = req.body;

    const userId = req.userId;

    if (!struggle_duration || !bed_time || !wakeup_time || !sleep_duration || !goal_id) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    if (!struggleDurationChoices.includes(struggle_duration)) {
        return res.status(400).json({
            error: 'Please provide a valid struggle_duration',
            valid_choices: struggleDurationChoices
        })
    }

    try {
        const goal = await db.select().from(goals).where(eq(goals.id, goal_id)).limit(1);
        if (goal?.length === 0) {
            return res.status(400).json({ error: 'please provide a valid goal_id' });
        }

        const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (user?.length === 0) {
            return res.status(400).json({ error: 'user does not exist' });
        }

        const [result] = await db.insert(sleepRecords).values({
            struggle_duration,
            bed_time,
            wakeup_time,
            sleep_duration,
            sleep_efficiency,
            user_id: userId,
            goal_id
        }).returning();

        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/v1/sleep_records', authenticateToken, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (user?.length === 0) {
            return res.status(400).json({ error: 'user does not exist' });
        }
        const result = await db.select().from(sleepRecords)
            .innerJoin(goals, eq(sleepRecords.goal_id, goals.id))
            .where(eq(sleepRecords.user_id, userId));

        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));