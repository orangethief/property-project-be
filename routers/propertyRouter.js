import { Router } from 'express';
import { getPropertiesWithPagination, getPropertyById, deleteProperty, createProperty, updateProperty } from '../controllers/properties.js';

const propertyRouter = Router();

propertyRouter.route('/').get(getPropertiesWithPagination).post(createProperty);
propertyRouter.route('/:id').put(updateProperty).delete(deleteProperty).get(getPropertyById);

export default propertyRouter;