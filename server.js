const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

// 👉 1. Servir frontend PRIMERO
server.use(jsonServer.defaults({
  static: path.join(__dirname)
}));

// 👉 2. JSON body parser
server.use(jsonServer.bodyParser);

// 👉 3. API con prefijo
server.use("/api", router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
