import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import settingsRoutes from './routes/settings';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Ecwid Custom Widget Backend');
});

app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
