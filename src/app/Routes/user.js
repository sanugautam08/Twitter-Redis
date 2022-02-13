import { getUser, updateUser, deleteUser } from "../controllers/userController";
import { validateUserUpdate } from "../validators/userValidator";

const router = require("express").Router();

// Get user details
router.get("/", getUser);

export default router;
