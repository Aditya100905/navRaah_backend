import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// MIDDLEWARES

// CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
// JSON VALIDATER AND LIMITER
app.use(express.json({ limit: '16kb' }));

app.use(
    express.urlencoded({
        extended: true,
        limit: '16kb',
    })
);

app.use(express.static('public'));

app.use(cookieParser());

// ROUTES
import userRouter from './api/routes/user.routes.js';
import busRouter from './api/routes/bus.routes.js'
import routeRouter from './api/routes/route.routes.js'
import feedbackRouter from './api/routes/feedback.routes.js';
import scheduleRouter from './api/routes/schedule.routes.js';
import userBusRouter from './api/routes/userBus.routes.js';
import stopRouter from './api/routes/stop.routes.js';


app.use('/api/stop', stopRouter);
app.use('/api/users',userRouter);
app.use('/api/bus', busRouter);
app.use('/api/route', routeRouter);
app.use("/api/feedback", feedbackRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/userBus', userBusRouter);


export { app };
