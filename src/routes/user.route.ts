import { Router, Response } from "express";
import { auth, db, admin } from "../config/firebaseAdmin";
import validateUser from "../middlewares/validateUser.middleware";
import { authenticate, AuthRequest } from "../middlewares/auth.middleware";
import * as Model from "../models/User";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", authenticate, getAllUsers);
router.get("/users/:id", authenticate, getUserById);
router.post("/users", validateUser, createUser);
router.put("/users/:id", validateUser, updateUser);

export default router;
