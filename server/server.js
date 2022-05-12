const express = require('express');
const app = express();
const http = require('http');

const mongoose = require('mongoose');
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { authCheck } = require('./helpers/auth');
// usage

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, './typeDefs'))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
);

const { PORT } = process.env;

// graphql server
async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  // db
  await mongoose
    .connect(
      process.env.DATABASE_CLOUD
      //   {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    )
    .then(() => {
      console.log('MongoDB connected');
      // port
      app.listen(PORT, () => {
        console.log(`server is ready at http://localhost:${PORT}`);
        console.log(
          `graphql server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
        );
      });
    })
    .catch((err) => console.log('DB Error => ', err));
}

startServer();

// const httpserver = http.createServer(app);

// rest  endpoint
app.get('/rest', authCheck, function (req, res) {
  res.json({
    data: 'you hit rest endpoint',
  });
});
