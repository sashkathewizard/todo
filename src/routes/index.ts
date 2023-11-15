import {Router} from "express";
import {todoRouter} from "./todoRouter";

const router = Router();

router.use('/todos', todoRouter);


export { router };