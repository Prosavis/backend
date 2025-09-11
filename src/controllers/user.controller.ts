import { Request, Response } from 'express';
import * as Model from '../models/User';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createUser = (req: Request, res: Response): void => {
    // Logic to create a user
    res.status(201).send('User created');
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    // Logic to get all users
    const users = await Model.getAllUsers(); // Replace with actual user fetching logic
    res.status(200).json({ users: users });
}

export const getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;
    // Logic to get a user by ID
    res.status(200).send(`User ${id}`);
}

export const updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    // Logic to update a user
    res.status(200).send(`User ${id} updated`);
}

export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    // Logic to delete a user
    res.status(200).send(`User ${id} deleted`);
}
