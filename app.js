const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const validateRoute = require('./routes/validateRoute');
const responseHandler = require('./services/responseHandler');

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Gospel Chinyereugo',
      github: '@Ebugo',
      email: 'gospelokpara@gmail.com',
      mobile: '08109503956',
      twitter: '@Codebug_'
    }
  })
})

app.use('/validate-rule', validateRoute)

// Error Handler
app.use((err, req, res, next) => {
  let message;
  if (!err) return next();

  if (err.type === 'entity.parse.failed') {
    message = 'Invalid JSON payload passed.';
  } else {
    message = err.message;
  }
  res.status(404).json(responseHandler(false, message));
})

app.use((req, res) => {
  res.status(404)
  .json(responseHandler(false, 'Sorry, we do not have that endpoint at the moment.'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
