const express = require("express");
const router = express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync")
const {isLoggedIn} = require("../middleware");
const bookingController = require("../controller/booking")

router.post("/",isLoggedIn,wrapAsync(bookingController.createBooking));
router.get("/my-bookings",isLoggedIn,wrapAsync(bookingController.myBookings));
router.delete("/my-bookings/:id",wrapAsync(bookingController.deleteBooking));
router.get("/",isLoggedIn,wrapAsync(bookingController.viewBookings));
module.exports = router;