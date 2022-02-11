import { getUser, updateUser, deleteUser } from "../controllers/userController";
import { validateUserUpdate } from "../validators/userValidator";

const router = require("express").Router();

// Get user details
router.get("/", getUser);

// Update user details
router.patch("/", validateUserUpdate, updateUser);

// Update user details
router.delete("/", deleteUser);

export default router;
