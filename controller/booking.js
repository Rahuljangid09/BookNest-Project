const Listing = require("../Models/listings");
const Booking = require("../Models/booking");
const ExpressError = require("../utils/ExpressError");

module.exports.createBooking = async (req, res) => {
  let { id } = req.params;
  let { checkIn, checkOut } = req.body.booking;

  let listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }
  if (listing.owner.equals(req.user._id)) {
    throw new ExpressError(403, "You cannot book your own liisting");
  }

  let startDate = new Date(checkIn);
  let endDate = new Date(checkOut);

  if (endDate <= startDate) {
    throw new ExpressError(400, "Check-out must be after Check-in date");
  }

  const existingBooking = await Booking.findOne({
    listing: listing._id,
    status: "confirmed",
    checkIn: { $lt: endDate },
    checkOut: { $gt: startDate },
  });

  if (existingBooking) {
    throw new ExpressError(
      400,
      "This listing is already booked for selected dates",
    );
  }

  let totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  let totalPrice = totalDays * listing.price;
  let booking = new Booking({
    listing: listing._id,
    guest: req.user._id,
    checkIn: startDate,
    checkOut: endDate,
    totalPrice,
  });
  await booking.save();

  req.flash("success", "Booking confirmed!");
  res.redirect("/listings");
};

module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });
  res.render("Bookings/myBookings", { bookings });
};

module.exports.deleteBooking = async (req, res) => {
  let { id } = req.params;

  await Booking.findByIdAndUpdate(id, {
    status: "cancelled",
  });

  req.flash("success", "Booking cancelled");
  res.redirect("/bookings/my-bookings");
};

module.exports.viewBookings = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  // 🔥 SECURITY CHECK
  if (!listing.owner.equals(req.user._id)) {
    throw new ExpressError(403, "Not authorized");
  }

  let bookings = await Booking.find({ listing: id })
    .populate("guest")
    .sort({ createdAt: -1 });

  res.render("Bookings/ownerBookings", { listing, bookings });
};
