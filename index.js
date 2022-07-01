require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Template Engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./helper/handlebar'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','view'));

// connectDB
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

const employeeRouter = require('./routes/employee');
const detailRouter = require('./routes/detail');
const authRouter = require('./routes/auth');
const historyRouter = require('./routes/history');
const updateRouter = require('./routes/update');

app.use('/login', authRouter);
app.use('/details',authenticateUser, detailRouter);
app.use('/history',authenticateUser, historyRouter);
app.use('/home',authenticateUser,employeeRouter);
app.use('/update',authenticateUser,updateRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}/login`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();