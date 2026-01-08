const express = require("express");
const router = express.Router();
const Listing = require("../Models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

//index route
router.get(
  "/",
  wrapAsync(listingController.index)
);

//new listing
router.get("/new", isLoggedIn,listingController.createNewForm);

router.post(
  "/",
  validateListing,
  upload.single('listing[image][url]'),
  wrapAsync(listingController.newListing)
);


router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);

//edit listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.createEditForm)
);
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single('listing[image][url]'),
  validateListing,
  wrapAsync(listingController.Update)
);

//delete listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroy)
);

module.exports = router;

