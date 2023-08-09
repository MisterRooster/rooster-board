import express from 'express';

// Required controller modules.
import { message_new_get, message_new_post } from "../controllers/message.controller";

const router = express.Router();

// GET request for creating Message.
router.get("/", message_new_get);

// POST request for creating message.
router.post('/', message_new_post);

export default router;