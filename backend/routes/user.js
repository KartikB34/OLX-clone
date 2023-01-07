const express=require("express");
const { register, login, logout, getUserPosts, myProfile, getUserProfile, getAllUsers, getAllMyPosts, purchaseRequest, acceptPurchaseRequest, declinePurchaseRequest, getAllMyPurchases } = require("../controller/user");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, myProfile)
router.route("/user/:id").get(isAuthenticated, getUserProfile)
router.route("/users").get(isAuthenticated, getAllUsers)
router.route("/my/allposts").get(isAuthenticated, getAllMyPosts)

router.route("/purchase/request/:id").put(isAuthenticated, purchaseRequest)
router.route("/accept/request/:id").put(isAuthenticated, acceptPurchaseRequest)
router.route("/decline/request/:id").put(isAuthenticated, declinePurchaseRequest)


router.route("/my/purchases").get(isAuthenticated, getAllMyPurchases)

module.exports = router;