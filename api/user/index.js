const userService = require("../../services/user.service");

const router = require("express").Router();

router.get("/", userService.getUsers);
router.get("/:id", userService.getUser);
router.post("/", userService.createUser);
router.put("/:id", userService.updateUser);
router.delete("/:id", userService.deleteUser);

module.exports = router;
