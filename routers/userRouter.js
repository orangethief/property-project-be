import { Router } from "express";
import { getUsers, createUser, getUserById, updateUser, deleteUser, addFavorite, removeFavorite, getAllFavorites } from "../controllers/users.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
userRouter.route('/:userId/favorites/:propertyId').put(addFavorite).delete(removeFavorite);
userRouter.route('/:id/favorites').get(getAllFavorites);

export default userRouter;
