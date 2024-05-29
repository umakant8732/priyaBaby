import BbaFormModel from "../../models/admissionform/bbaForm.modal.js";

export const createBbaForm = async (req, res) => {
    try {
        const bbaForm = new BbaFormModel(req.body);
        await bbaForm.save();
        res.status(201).json({ message: "BbaForm created successfully", bbaForm });
    } catch (error) {
        res.status(500).json({ message: "Failed to create BbaForm", error: error.message });
    }
}

export const getBbaForm = async (req, res) => {
    try {
        const bbaForms = await BbaFormModel.find({ deleted: false });
        res.status(200).json(bbaForms);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve BbaForms", error: error.message });
    }
}

export const getBbaFormById = async (req, res) => {
    try {
        const bbaForm = await BbaFormModel.findById(req.params.id);
        if (!bbaForm) {
            return res.status(404).json({ message: "BbaForm not found" });
        }
        res.status(200).json(bbaForm);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve BbaForm", error: error.message });
    }
}

export const updateBbaForm = async (req, res) => {
    try {
        const bbaForm = await BbaFormModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bbaForm) {
            return res.status(404).json({ message: "BbaForm not found" });
        }
        res.status(200).json(bbaForm);
    } catch (error) {
        res.status(500).json({ message: "Failed to update BbaForm", error: error.message });
    }
}

export const deleteBbaForm = async (req, res) => {
    try {
        const bbaForm = await BbaFormModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!bbaForm) {
            return res.status(404).json({ message: "BbaForm not found" });
        }
        res.status(200).json(bbaForm);
    } catch (error) {
        res.status(500).json({ message: "Failed to delete BbaForm", error: error.message });
    }
}
