import express from "express"
import { createMbaForm, getMbaForm, mbaFormById, updateMbaForm, deleteMbaForm } from "../../controllers/admissionform/mbaForm.controller.js"


const MBAFormRouter = express.Router();

MBAFormRouter.post("/", createMbaForm);
MBAFormRouter.get("/", getMbaForm);
MBAFormRouter.get('/:id', mbaFormById);
MBAFormRouter.put('/delete/:id', deleteMbaForm);


export default MBAFormRouter;

