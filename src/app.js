// CORE ITEMS
import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
// ROUTES
import homeRoute from './routes/home';
import authRoute from './routes/auth';
// MIDDLEWARES
import log from './middlewares/log';

let app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(log);
app.use('/auth', authRoute);
app.use('/api', homeRoute);

app.set('port', process.env.PORT || 8085);

app.listen(app.get('port'), function () {
    console.log(`Example app listening on port ${app.get('port')}!`)
});