import db from '../config/db.config.js';

export default {
    // Fetch all companies
    getCompanies: async (req, res) => {
        const companies = await db.company.findAll();
        res.json(companies);
    },

    // Fetch users for a specific company
    getUsersByCompany: async (req, res) => {
        const companyId = req.params.id;
        try {
            const users = await db.users.findAll({
                where: {
                    company_id: companyId
                }
            });
            res.json(users);
        } catch (err) {
            res.status(500).json({
                error: 'Failed to fetch users'
            });
        }
    }
};
