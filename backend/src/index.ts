import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apartmentRoutes from './routes/apartment.routes';

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/apartments', apartmentRoutes);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/apartmentdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
