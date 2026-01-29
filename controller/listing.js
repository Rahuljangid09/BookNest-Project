const Listing = require("../Models/listings.js");

module.exports.index = async (req, res) => {
  const { search } = req.query;
  let allListings;
  if (search) {
    allListings = await Listing.find({
      $or: [
        { country: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ]
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings,search });
};

module.exports.createNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.newListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing added");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  let originalImage = listing.image.url;
  originalImage.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing });
};

module.exports.Update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    listing.save();
  }
  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
