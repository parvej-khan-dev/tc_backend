import express, { Application, Request, Response } from 'express';
import routes from './api/routes';
import dbInit from './db/init';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const app: Application = express();
const port = process.env.PORT || 9500;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Welcome to the User Caller API! \n Endpoints available at http://localhost:${port}/api/v1`,
  });
});

app.use('/api/v1', routes);

// database
dbInit();

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
