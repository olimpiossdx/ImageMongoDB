const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const db = 'mongodb://localhost/react_image';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.listen(3000, () => console.log('server started on Port 3000'));


app.get('/', (req, resp) => resp.send('funcionando em ' + new Date()));

const UserSchema = new mongoose.Schema({
    name: String,
    extensao: String,
    imgUrl1: String,
    imgUrl2: String,
    imgUrl3: String
});

const Image = mongoose.model('image', UserSchema);

app.post('/upload', async (req, res) => {
    try {
        const result = await Image.create(req.body.user);
        res.status(200).json(result);
    } catch (error) {
        console.error('Algum erro ocorreu ao salvar o arquivo', error);
    }
});

app.get('/getLatest', async (req, res) => {
    const getImage = await Image.findOne().sort({ _id: -1 });
    res.json(getImage);
});