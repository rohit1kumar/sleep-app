import dotenv from 'dotenv';
dotenv.config()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createToken = (user_id) => jwt.sign({ user_id }, process.env.JWT_SECRET);

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const struggleDurationChoices = ['less_than_2_weeks', '2_to_8_weeks', 'more_than_8_weeks']