const { required } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema =mongoose.Schema;

const listingSchema = new Schema ({
    title:{
       type: String,
       required:true,
    },
    description:String,
    image: {
    filename: String,
    url: String
  },
    image: {
    filename: {
        type: String,
    },
    url: {
        type: String,
    },
},
    price:{
        type:Number,
        required:true,
    },
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;