import {Router} from 'express';
import {login} from '../controllers/auth.js';

const authRoutes = Router();

authRoutes.get('/login', login)

export default authRoutes;