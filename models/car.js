const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
{
    brand: {type: String},
    model: {type: String},
    year: {type: Number},
    price: {type: Number},
    type: {type: String}
}
);

module.exports = mongoose.model("car", productSchema);

