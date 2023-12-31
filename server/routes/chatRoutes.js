const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    fetchChats,
    createChat,
    deleteChat,
    createGroupChat,
    renameGroupChat,
    removeFromGroupChat,
    addToGroupChat
} = require("../controllers/ChatController");

router.get("/", protect, fetchChats); 
router.post("/", protect, createChat);
router.delete("/:id", protect, deleteChat);

router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroupChat);
router.put("/groupremove", protect, removeFromGroupChat);
router.put("/groupadd", protect, addToGroupChat);

module.exports = router;