const express = require('express');

const postsRoutes = require('./posts-routes');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRoutes);

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
