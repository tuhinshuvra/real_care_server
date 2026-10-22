import express from 'express';
import { Role } from '../../../generated/prisma/enums';
import { checkAuth } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { reviewControllers } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.get('/',
    reviewControllers.getAllReviews);

router.post('/',
    checkAuth(Role.PATIENT),
    validateRequest(ReviewValidation.createReviewZodSchema),
    reviewControllers.giveReview
);

router.get('/my-reviews',
    checkAuth(Role.PATIENT, Role.DOCTOR),
    reviewControllers.myReviews);

router.patch('/:id',
    checkAuth(Role.PATIENT),
    validateRequest(ReviewValidation.updateReviewZodSchema),
    reviewControllers.updateReview);

router.delete('/:id',
    checkAuth(Role.PATIENT),
    reviewControllers.deleteReview);

export const reviewRoutes = router;