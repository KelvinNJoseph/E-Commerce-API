import {Router} from 'express';
import {login, signup} from '../controllers/auth.js';
import { errorHandler } from '../error-handler.js';

const authRoutes = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post("/login", errorHandler(login));

export default authRoutes;