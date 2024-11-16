import { Router } from 'express';
import { getPropertiesWithPagination, getPropertyById, deleteProperty, createProperty, updateProperty } from '../controllers/properties.js';
import asyncHandler from '../middleware/asyncHandler.js';

const propertyRouter = Router({ mergeParams: true });

propertyRouter.route('/').get(asyncHandler(getPropertiesWithPagination)).post(asyncHandler(createProperty));
propertyRouter.route('/:id').put(asyncHandler(updateProperty)).delete(asyncHandler(deleteProperty)).get(asyncHandler(getPropertyById));

export default propertyRouter;
