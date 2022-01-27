import express from 'express';
import bodyParser from "body-parser";

const app = express();

import indexRoutes from './routes/image.routes';

app.use(bodyParser.json());
app.use(indexRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(Date());
    console.log('Listening on ' + port);
});