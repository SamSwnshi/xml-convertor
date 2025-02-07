import Credit from "../models/creditReport.models.js";

export const getReportsController = async (req, res) => {
    try {
        const reports = await Credit.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: " Error fetching reports", error: error.message });
    }
};
