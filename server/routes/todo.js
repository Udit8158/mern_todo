import express from "express";
import { body } from "express-validator";
import createTodo from "../controllers/createTodo.js";
import deleteIndividualTodo from "../controllers/deleteIndividualTodo.js";
import getAllTodos from "../controllers/getAllTodos.js";
import getIndividualTodo from "../controllers/getIndividualTodo.js";
import updateIndividualTodo from "../controllers/updateIndividualTodo.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const todoRoute = express();

todoRoute
  .route("/")
  .get(verifyAccessToken, getAllTodos)
  .post(verifyAccessToken, [body("title").exists()], createTodo);

todoRoute
  .route("/:id")
  .get(verifyAccessToken, getIndividualTodo)
  .patch(verifyAccessToken, updateIndividualTodo)
  .delete(verifyAccessToken, deleteIndividualTodo);

export default todoRoute;
