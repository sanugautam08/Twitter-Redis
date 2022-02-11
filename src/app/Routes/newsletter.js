const express = require("express");
const router = express.Router();
import verifyAdmin from "../../Middleware/admin.middleware";
import authenticate from "../../Middleware/auth.middleware";
import {
  addSubscription,
  deleteSubscription,
  getSubscriptions,
} from "../controllers/newsletterController";
import { validateAddNewsletter } from "../validators/newsletterValidator";

router.get("/", authenticate, verifyAdmin, getSubscriptions);

router.post("/", validateAddNewsletter, addSubscription);

router.delete("/:id", authenticate, verifyAdmin, deleteSubscription);

export default router;
