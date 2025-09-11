import { Request, Response, NextFunction } from "express";
import { admin } from './../config/firebaseAdmin';

// Extender Request para incluir uid
export interface AuthRequest extends Request {
    uid?: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        (req as any).user = { uid: 'test' };
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        (req as any).user = decodedToken; // puedes guardar info del usuario en req
        next();
    } catch (err: any) {
        return res.status(401).json({ error: 'Token inválido', message: err.message });
    }
};
