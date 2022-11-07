// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

let id = 1;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

// POST METHOD
server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;

  if (author && title && contents) {
    const post = {
      id,
      author,
      title,
      contents,
    };

    posts.push(post);
    id++;
    return res.json(post);
  }

  res.status(STATUS_USER_ERROR).json({
    error: "No se recibieron los parámetros necesarios para crear el Post",
  });
});

server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;

  if (author && title && contents) {
    const post = {
      id,
      author,
      title,
      contents,
    };

    posts.push(post);
    id++;
    return res.json(post);
  }

  res.status(STATUS_USER_ERROR).json({
    error: "No se recibieron los parámetros necesarios para crear el Post",
  });
});

// GET METHOD
server.get("/posts", (req, res) => {
  const { term } = req.query;

  if (term) {
    let newPosts = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.json(newPosts);
  }

  res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const authorPosts = posts.filter((p) => p.author === author);

  if (authorPosts.length) {
    return res.json(authorPosts);
  }

  res
    .status(STATUS_USER_ERROR)
    .json({ error: "No existe ningun post del autor indicado" });
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const authorPosts = posts.filter(
    (p) => p.author === author && p.title === title
  );

  if (authorPosts.length) {
    return res.json(authorPosts);
  }

  res
    .status(STATUS_USER_ERROR)
    .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
});

// PUT METHOD
server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;

  if (id && title && contents) {
    const post = posts.find((p) => p.id === id);

    if (post) {
      post.title = title;
      post.contents = contents;

      return res.json(post);
    }

    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho id",
    });
  }

  res.status(STATUS_USER_ERROR).json({
    error: "No se recibieron los parámetros necesarios para crear el Post",
  });
});

// DELETE METHOD
server.delete("/posts", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se recibio el campo id" });
  }

  const post = posts.filter((p) => p.id === id);

  if (post.length) {
    posts = posts.filter((p) => p.id !== id);
    return res.json({ success: true });
  }

  return res.status(STATUS_USER_ERROR).json({ error: "El id es inválido" });
});

server.delete("/author", (req, res) => {
  const { author } = req.body;

  if (!author) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se recibio el campo author" });
  }

  const authorPosts = posts.filter((p) => p.author === author);

  if (authorPosts.length) {
    posts = posts.filter((p) => p.author !== author)
    return res.json(authorPosts);
  }

  return res
    .status(STATUS_USER_ERROR)
    .json({ error: "No existe el autor indicado" });
});

module.exports = { posts, server };
