import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';
import cors from 'cors';
import schema from './schema';
import dotenv from 'dotenv'
dotenv.config()


// setup
const app = express();
const api = new ApolloServer({ 
    schema,
    persistedQueries: {
        ttl: 15,
        cache: new BaseRedisCache({
          client: new Redis()
        }),
      } 
});
const PORT = process.env.PORT || 5000;

(async function startAPI() {
    await api.start();
    api.applyMiddleware({ app, path: '/graphql' });
    console.log('API started...');
} ());

(async function startMongoDB() {
    await mongoose.connect('mongodb://localhost:27017/todo');
    mongoose.set('debug', true);
    console.log('mongoDB started...');
} ());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// listen to http server
app.listen(PORT, () => {
     console.log(`GraphQL is now running on http://localhost:${PORT}/graphql`)
});