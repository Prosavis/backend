import { Request, Response, NextFunction } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { username, email } = req.body as { username: string; email: string };

    if (!username || typeof username !== 'string') {
        res.status(400).send('Invalid username');
        return;
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).send('Invalid email');
        return;
    }

    next();
}

export default validateUser;
