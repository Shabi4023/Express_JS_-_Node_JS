const express = require('express')
const router = express.Router()
const controller = require("../controller/userController")

router.route("/").get(controller.defaultFunc);
router.route("/create").post(controller.createUser);
router.route("/getUser").get(controller.getAllUser);
router.route("/getUserByID").get(controller.getUserByID);
router.route("/updateUser").put(controller.updateUserByID);
router.route("/deleteUser").delete(controller.deleteUserByID)
            

module.exports = router;