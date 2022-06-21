import { Router, Request, Response } from 'express';
import fs from 'fs'
export const index = Router();


index.get('/', async (req: Request, res: Response): Promise<void> => {
    res.status(200).json('hello there');
});

index.get('/session', async (req: Request, res: Response): Promise<void> => {
    try {        
        const entries = fs.readFileSync('./data/chat_tracker.json', 'utf8')
        const session = JSON.parse(entries)
        res.status(200).json(session);
        return
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        return
    }
});

index.get('/streamer/:handle', async(req: Request<{handle: string}>, res: Response): Promise<void> => {
    try {
        const entries = fs.readFileSync('./data/chat_tracker.json', 'utf8')
        const session = JSON.parse(entries)

        const streamer = req.params.handle as string 
        const data = session[`#${streamer}`];
        console.log(data)
        res.status(200).json(data);
        return
    } catch (error) {
        res.status(500).json(error)
    }
});

index.post('/streamer/add', async(req: Request, res: Response): Promise<void> => {
    try {      
        const entries = fs.readFileSync('./data/streamers.json', 'utf8');
        const s = JSON.parse(entries)
        res.status(200).json(s)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});