    import express from 'express';
    import {
    createCapsule,
    getCapsules,
    deleteCapsule,
    } from '../controllers/capsuleController.js';
    import { protect } from '../middleware/authMiddleware.js';

    const router = express.Router();

    router.route('/')
    .post(protect, createCapsule)
    .get(protect, getCapsules);

    router.delete('/:id', protect, deleteCapsule);

    export default router;
