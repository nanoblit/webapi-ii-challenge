const express = require('express');

const postsRoutes = require('./posts-routes');

const server = express();

const port = process.env.PORT || 4000;

server.use(express.json());
server.use('/api/posts', postsRoutes);

server.listen(port, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
