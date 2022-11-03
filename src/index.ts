import mongoose from "mongoose";

import { app } from "./app";
import * as dotenv from 'dotenv'
dotenv.config()

const startUp = async () => {
  let connString = 'mongodb://auth-mongo-srv:27017/socio' // production url of MongoDb
  console.log('node is running in ', process.env.NODE_ENV, 'mode')
  // comment this if block
  if (process.env.NODE_ENV === 'development') {
    connString = 'mongodb://localhost:27017/socio'
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  mongoose.connect(connString)
    .then(() => {
      console.log('auth-database succesfuuly connected')
      app.listen(3000, () => {

        console.log('Listening on port 3000!!!!!!!!');
      });
    })
    .catch(() => {
      console.log('Database connection failed - auth-database')
      console.log('auth Ms Failed to start')
    })
}
startUp()

