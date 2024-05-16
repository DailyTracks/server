const userController = require("../../controllers/user.controller");

const router = require("express").Router();
const profileIndex = require("./profile/index");
router.get("/", userController.getUsers);
router.get("/follow", userController.isFollowUser);
router.get("/:id", userController.getUser);
router.get("/:id/following", userController.getFollowing);
router.get("/:id/follower", userController.getFollower);
router.post("/:id/follow", userController.followUser);

// /** user를 만들 때 create 로 만들어야함. */
// router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.delete("/:id/follow", userController.unFollowUser);

/**
 * follow
 */

/**
 * [
    {
        "id": 1,
        "follower_id": 1,
        "followee_id": 3,
        "createdAt": "2024-05-06T18:15:57.000Z",
        "updatedAt": "2024-05-06T18:15:57.000Z"
    }
]
TODO: join 으로 구성해야함.
 */
/** user's profile */
router.use("/:id/profile", profileIndex);
module.exports = router;
