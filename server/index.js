import express from 'express';
import log4js from 'log4js';

import './config/log4js';

const logger = log4js.getLogger();

const app = express();
const PORT = 4000;

// setup routing
const router = express.Router();
router.get('/api/blogs', (req, res) => {
  const result = {
    blogs: [{
      _id: 1,
      title: 'Seoul',
    }, {
      _id: 2,
      title: 'Tokyo',
    }, {
      _id: 3,
      title: 'London',
    }, {
      _id: 4,
      title: 'Paris',
    }],
  };
  res.status(200).json(result);
});

app.use(router);

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  logger.info(`Express server listening on port ${PORT}`);
});
