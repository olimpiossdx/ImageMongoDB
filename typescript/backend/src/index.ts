import express, { Request, Response } from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import { connectUrl } from './db';
import { postUpload, getUser } from './controller/user';

mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.listen(3000, () => console.log('server started on Port 3000'));

app.post('/upload', async (request: Request, response: Response) => {
    const result = postUpload(request.body.user);
    result ? response.status(200) : response.json({ message: 'Algum erro ocorreu ao salvar o arquivo' });
});

app.get('/getLatest', async (_request: Request, response: Response) => {
    response.json(await getUser());
});