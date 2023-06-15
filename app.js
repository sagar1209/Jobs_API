require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const Mongo_db = require('./db/connect')
const authrouter = require('./routes/auth');
const jobrouter = require('./routes/jobs');
const Authorization = require('./middleware/authentication');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const RateLimit = require('express-rate-limit');



app.use(RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth',authrouter);
app.use('/api/v1/jobs',Authorization,jobrouter);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await Mongo_db(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
