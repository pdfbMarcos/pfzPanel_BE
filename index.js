require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json(), (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

app.delete("/logs/:id", async (req, res) => {
  await db.deleteLog(req.params.id);
  res.sendStatus(204);
});

app.post("/logs", async (req, res) => {
  await db.insertLog(req.body);
  res.sendStatus(201);
});

app.get("/logs/data/:filter", async (req, res) => {
  const results = await db.selectLog(req.params.filter);
  res.json(results);
});

app.get("/logs/matricula/:filter", async (req, res) => {
  const results = await db.selectLogMatricula(req.params.filter);
  res.json(results);
});

app.get("/logs/datamatricula/:dt/:matricula", async (req, res) => {
  const results = await db.selectLogDataMatricula(
    req.params.dt,
    req.params.matricula
  );
  res.json(results);
});

app.get("/documents/data/:filter", async (req, res) => {
  const results = await db.selectDocument(req.params.filter);
  res.json(results);
});

app.get("/documents/matricula/:filter", async (req, res) => {
  const results = await db.selectDocumentMatricula(req.params.filter);
  res.json(results);
});

app.get("/documents/datamatricula/:dt/:matricula", async (req, res) => {
  const results = await db.selectDocumentDataMatricula(
    req.params.dt,
    req.params.matricula
  );
  res.json(results);
});

app.put("/users/user/:tipo/:id", async (req, res) => {
  const results = await db.updateUserSession(req.params.tipo, req.params.id);
  res.json(results);
});

app.get("/users/user/:user/:password", async (req, res) => {
  const results = await db.selectUser(req.params.user, req.params.password);
  res.json(results);
});

app.get("/", (req, res) => {
  res.json({ message: "It is alive!" });
});

app.listen(process.env.PORT, () => {
  console.log("App is now running!");
});
