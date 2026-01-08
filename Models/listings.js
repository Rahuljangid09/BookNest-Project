const mongoose = require("mongoose");
const reviews = require("./reviews");
const Reviews = require("./reviews.js");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Reviews"
    }
  ],
  owner:
    {
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  
});

//mogoose middleware he yee: Explaination:- jb bhi koi listing ke liye findByIdAndDelete call hoga then humara ye middleware us listing me se sare reviews ko bhi delete krdega
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Reviews.deleteMany({_id:{$in:listing.reviews}})
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
