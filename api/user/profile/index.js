const { profiles } = require("../../../models");

const router = require("express").Router({
  mergeParams: true,
});

router.post("/", async (req, res) => {
  const userProfile = req.body;
  const { id } = req.params;
  console.log({
    ...userProfile,
    id: id,
  });
  const profile = await profiles.create({
    ...userProfile,
    id: id,
  });
  res.send({ msg: "good", profile: profile });
});
router.get("/", (req, res) => {
  console.log(req.params);
});

module.exports = router;
