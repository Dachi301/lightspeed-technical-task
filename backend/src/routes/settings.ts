import { Router, Request, Response } from 'express';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

const router = Router();
const settingsPath = path.join(__dirname, '../../settings.json');

// GET /api/settings
router.get('/', (req: Request, res: Response) => {
    fs.readFile(settingsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading settings' });
        }
        res.json(JSON.parse(data));
    });
});

// POST /api/settings
router.post('/', (req: Request, res: Response) => {
    const newSettings = req.body;
    fs.writeFile(settingsPath, JSON.stringify(newSettings, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving settings' });
        }
        res.json({ message: 'Settings updated successfully' });
    });
});

export default router;