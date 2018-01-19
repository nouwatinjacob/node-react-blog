const express = require('express');
const logger = require('morgan');
import parser from 'body-parser';
import routes from './server/routes/index';

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;

routes(router);

app.set('port', port);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use('/api/', router);

app.get('*', (req, res) => res.status(404).json({
  message: 'Invalid Url'
}));

app.listen(port, () => console.log(`Port running at ${port}`));

export default app;