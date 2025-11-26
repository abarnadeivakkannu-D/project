import express from 'express';
import db from '../config/db.config.js';

const router = express.Router();
const Users = db.users;
const Company = db.company;

// ✅ GET ALL COMPANIES
router.get('/company', async (req, res) => {
    try {
        const companies = await Company.findAll({
            attributes: ['company_id', 'company_code', 'company_name', 'contact_person', 'email', 'mobile_number'],
            order: [
                ['company_id', 'ASC']
            ]
        });

        res.json({
            status: 200,
            results: companies
        });

    } catch (err) {
        console.error("Error fetching companies:", err);
        res.status(500).json({
            status: 500,
            reason: "Error fetching companies",
            results: []
        });
    }
});

// ✅ GET ALL COMPANIES WITH USERS
router.get('/companyusers', async (req, res) => {
    try {
        const companyUsers = await Company.findAll({
            include: [{
                model: Users,
                as: 'users',
                attributes: ['id', 'name', 'email', 'mobile_number', 'status']
            }],
            order: [
                ['company_id', 'ASC'],
                [{
                    model: Users,
                    as: 'users'
                }, 'id', 'ASC']
            ]
        });

        res.json({
            status: 200,
            results: companyUsers
        });

    } catch (err) {
        console.error('Error fetching company users:', err);
        res.status(500).json({
            status: 500,
            reason: 'Error fetching users',
            results: []
        });
    }
});

// ✅ GET USERS FOR SPECIFIC COMPANY BY ID
router.get('/:id/users', async (req, res) => {
    const companyId = req.params.id;

    try {
        const company = await Company.findOne({
            where: {
                company_id: companyId
            },
            include: [{
                model: Users,
                as: 'users',
                attributes: ['id', 'name', 'email', 'mobile_number', 'status']
            }]
        });

        if (!company) {
            return res.status(404).json({
                status: 404,
                reason: 'Company not found',
                results: []
            });
        }

        res.json({
            status: 200,
            results: company.users // only users array
        });

    } catch (err) {
        console.error('Error fetching users for company:', err);
        res.status(500).json({
            status: 500,
            reason: 'Error fetching users',
            results: []
        });
    }
});

export default router;
