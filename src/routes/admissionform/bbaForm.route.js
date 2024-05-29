import express from 'express';
import {createBbaForm, getBbaForm, getBbaFormById, updateBbaForm, deleteBbaForm} from "../../controllers/admissionform/bbaForm.controller.js";

const BBAFormRouter = express.Router();

BBAFormRouter.post("/", createBbaForm);
BBAFormRouter.get("/", getBbaForm);
BBAFormRouter.get("/:id", getBbaFormById);
BBAFormRouter.put("/delete/:id", deleteBbaForm);

export default BBAFormRouter;