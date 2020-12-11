const express = require("express");
const listEndPoints = require("express-list-endpoints");
const productsRoutes = require("./products");
const reviewsRoutes = require("./reviews");
const filesRouter = require("./files");
const cors = require("cors");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling");

const server = express();

const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/products", productsRoutes);
server.use("/reviews", reviewsRoutes);
server.use("/files", filesRouter);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

console.log(listEndPoints(server));

server.listen(port, () => console.log("server is running on port ", port));
