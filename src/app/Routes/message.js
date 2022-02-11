import verifyAdmin from "../../Middleware/admin.middleware";
import authenticate from "../../Middleware/auth.middleware";
import {
  addMessage,
  deleteMessage,
  getMessages,
} from "../controllers/messageController";
import { validateAddMessage } from "../validators/messageValidator";

const express = require("express");

const router = express.Router();

router.get("/", authenticate, getMessages);

router.post("/", validateAddMessage, addMessage);

router.delete("/:id", authenticate, deleteMessage);

export default router;
