const express = require('express');

const db = require('./data/db');

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const { body } = req;
    if (!body.title || !body.contents) {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
      const response = await db.insert(body);
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the post to the database' });
  }
});

route.post('/:id/comments', async (req, res) => {
  try {
    const { body, params } = req;
    if (!body.text) {
      res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
    } else {
      const response = await db.insertComment({ ...body, post_id: params.id });
      if (!response) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(201).json(response);
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the comment to the database' });
  }
});

route.get('/', async (req, res) => {
  try {
    const response = await db.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { params } = req;
    const response = await db.findById(params.id);
    if (response.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
  }
});

route.get('/:id/comments', async (req, res) => {
  try {
    const { params } = req;
    const response = await db.findCommentById(params.id);
    if (response.length === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'The comments information could not be retrieved.' });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { params } = req;
    const response = await db.remove(params.id);
    if (response === 0) {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { params, body } = req;
    if (!body.title || !body.contents) {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
      const response = await db.update(params.id, body);
      if (response === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(response);
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

module.exports = route;
