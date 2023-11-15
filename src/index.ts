import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {sequelize} from "./database";
import {initTodoModel} from "./models/todo";
import {router} from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;
app.use(express.json());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        await initTodoModel();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});