import express from 'express';

const app = express();

import indexRoutes from './routes/image.routes';

app.use(indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on ' + port);
});