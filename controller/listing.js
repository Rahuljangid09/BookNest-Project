const Listing = require("../Models/listings.js");

module.exports.index = async (req, res) => {
  const { search, category } = req.query;

  let filter = {};
  // Search logic
  if (search) {
    filter.$or = [
      { country: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  //Category filter
  if (category) {
    filter.categories = category.toLowerCase();

  }

  console.log("Category from query:", category);
  console.log("Final filter:", filter);

  const allListings = await Listing.find(filter);

  res.render("listings/index.ejs", {
    allListings,
    search,
    category,
  });
};


module.exports.createNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.newListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const { listing } = req.body;

    //Handle categories safely
    if (!listing.categories) {
      listing.categories = [];
    }

    //Create listing
    const newListing = new Listing(listing)

  // const newListing = new Listing(req.body.listing);
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
