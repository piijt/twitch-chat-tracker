import { Router, Request, Response } from 'express';

export const index = Router();

index.get('/', async (req: Request, res: Response): Promise<void> => {
    res.status(200).json('hello there');
})