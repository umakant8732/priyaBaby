import MbaFormModal from "../../models/admissionform/mbaForm.modal.js";

export const createMbaForm = async (req, res) => {

    try {
        const mbaForm = new MbaFormModal(req.body);
        const savedForm = await mbaForm.save();
        res.status(201).json({ message: "MBA Admission Form Created Successfully", savedForm });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getMbaForm = async (req, res) => {
    try {
        const mbaForms = await MbaFormModal.find({ deleted: false });
        return res.status(200).json(mbaForms)

    } catch (error) {
        res.status(500).json({ message: "failed to get mba forms", error: error.message })
    }
}

export const mbaFormById = async (req, res, next) => {
    try {
        if (req.params.id) {
            const mbaForm = await MbaFormModal.findById(req.params.id);
            if (mbaForm) {
                return res.status(200).json(mbaForm)
            }
            else {
                return res.status(404).json({ error: "no record found" })
            }
        }
        else {
            return res.status(404).json({ error: "No Id Found" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateMbaForm = async (req, res, next) => {
    try {
        if (req.params.id) {

            const mbaForm = MbaFormModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (mbaForm) {
                return res.status(200).json(mbaForm)
            }
            else {
                return res.status(404).json({ error: "NO RECORD FOUND" })
            }

        }
        else {
            res.status(404).json({ error: "NO ID FOUND" })
        }
    } catch (error) {
        res.status(500).json({ message: "FAILED TO UPDATE MBA FORM", error: error.message })
    }
}

export const deleteMbaForm = async (req, res, next) => {
    try {
        if (req.params.id) {

            const mbaForm = await MbaFormModal.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })

            if (mbaForm) {
                return res.status(200).json(mbaForm)
            }
            else {
                return res.status(404).json({ error: "NO RECORD FOUND" })
            }
        }
        else {
            res.status(404).json({ error: "NO ID FOUND" })
        }
    } catch (error) {
        res.status(500).json({ message: "FAILED TO DELETE MBA FORM", error: error.message })
    }
}