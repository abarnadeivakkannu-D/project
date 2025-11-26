import express from "express";
import {
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
     getPaginatedUsers
} from "../controller/users.controller.js";

import db from "../config/db.config.js";
const Users = db.users;

const router = express.Router();

// =====================================
// AUTH
// =====================================
router.post("/login", loginUser);
router.get("/paginate", getPaginatedUsers);
router.get("/", getAllUsers); // GET all users (no pagination)
router.post("/", addUser); // ADD user
router.put("/:id", updateUser); // UPDATE user
router.delete("/:id", deleteUser); // DELETE user

export default router;
