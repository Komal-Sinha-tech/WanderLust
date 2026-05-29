const { required } = require("joi");
const mongoose = require("mongoose");
const review = require("./review");
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

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;