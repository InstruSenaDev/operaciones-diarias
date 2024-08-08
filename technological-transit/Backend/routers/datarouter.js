import express from 'express';
import { register } from '../controllers/dataController.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const newPerson = await register(req.body);
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

export default router;
