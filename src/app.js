import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(
  cors({
    // to set where the origin , we can't allow everyone to you know talk with our backend , i just want my
    // frontend to talk with backend that is why we do this
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);
// this line is used to limit the data we are accepting from any user , i don't want unlimited data , that might crash
// my server so we limit it
app.use(express.json({ limit: '16kb' }));
// url might get changed sometime depending upon browser to browser , so we add this urlencoded option
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// to store all the public data like images , etc , icons this public is a folder i have made , you can name
// it anything you want
app.use(express.static('public'));
// to store edit cookie that i set by my browser.
app.use(cookieParser());

export { app };
