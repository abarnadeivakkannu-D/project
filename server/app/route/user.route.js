import express from "express";
import {
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} from "../controller/users.controller.js";
const router = express.Router(); 
// Auth
 router.post("/login", loginUser); // Users 
 router.get("/", getAllUsers); // GET all users 
 router.post("/", addUser);// ADD user 
 router.put("/:id", updateUser); // UPDATE user
 router.delete("/:id", deleteUser); // DELETE user 
   
 export default router;