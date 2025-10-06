import 'dotenv/config';
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

dotenvFlow.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
