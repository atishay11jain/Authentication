const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT, CLIENT_URL, DB_SYNC} = require('./config/serverConfig');
const cookieParser = require('cookie-parser');
const { StatusCodes } = require('http-status-codes');

const apiRoutes = require('./routes');
const globalErrorHandler = require('./controllers/global-error');
const db = require('./models/index');
const app = express();

const setUpAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(cors({
        origin: CLIENT_URL,
        credentials: true,
    }));

    app.use('/api', apiRoutes);

    app.use((req, res, next) => {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Route not found"
        });
    });

    if(DB_SYNC)
    {
        db.sequelize.sync({alter:true});
    }
    
    app.use(globalErrorHandler);
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setUpAndStartServer();