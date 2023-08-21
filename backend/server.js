const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("products.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");
server.use(cors());

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
