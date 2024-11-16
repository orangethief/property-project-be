import { Router } from "express";
import { getUsers, createUser, getUserById, updateUser, deleteUser, addFavorite, removeFavorite, getAllFavorites } from "../controllers/users.js";
import asyncHandler from "../middleware/asyncHandler.js";

const userRouter = Router({ mergeParams: true });

userRouter.route("/").get(asyncHandler(getUsers)).post(asyncHandler(createUser));
userRouter.route('/:id').get(asyncHandler(getUserById)).put(asyncHandler(updateUser)).delete(asyncHandler(deleteUser));
userRouter.route('/:userId/favorites/:propertyId').put(asyncHandler(addFavorite)).delete(asyncHandler(removeFavorite));
userRouter.route('/:id/favorites').get(asyncHandler(getAllFavorites));

export default userRouter;
