import { Router } from "express";
import { login, register } from '../controllers/auth.js';
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router({ mergeParams: true });

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));

export default router;
