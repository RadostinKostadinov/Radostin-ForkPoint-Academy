const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  price_max: {
    type: Number,
  },
  page_description: {
    type: String,
  },
  page_title: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  variation_attributes: {
    type: [],
  },
  id: {
    type: String,
  },
  currency: {
    type: String,
  },
  master: {
    type: Object,
  },
  primary_category_id: {
    type: String,
  },
  image_groups: {
    type: [],
  },
  short_description: {
    type: String,
  },
  orderable: {
    type: Boolean,
  },
  variants: {
    type: [],
  },
  type: {
    type: Object,
  },
  long_description: {
    type: String,
  },
  c_isSale: {
    type: Boolean,
  },
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);
