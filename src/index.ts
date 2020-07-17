import  {PORT} from './config'
import router from './routes/index';
import express ,{json}from 'express';
import  cors from 'cors';
const app =express();

app.use(cors({ origin: true}));
app.use(json());
app.use(express.urlencoded({extended:false}));
app.use(router);
app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`);
});