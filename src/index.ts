import mongoose from "mongoose";

import { app } from "./app";
import * as dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 8080;

const startUp = async () => {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const connString = (process.env.NODE_ENV==='development' ? 'mongodb://localhost:27017/socio': process.env.MONGO_URL) as string  
 
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
   await mongoose.connect(connString, {})
    console.log('auth-database succesfuuly connected')
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.log('Database connection failed ', err)
    console.log('Failed to start')
  }

}
startUp()
