import { getUser } from "../controllers/userController";

const router = require("express").Router();

// Get user details
router.get("/", getUser);

export default router;
