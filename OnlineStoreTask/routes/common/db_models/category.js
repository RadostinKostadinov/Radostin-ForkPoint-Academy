const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categories: {
    type: [],
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  page_description: {
    type: String,
    required: true,
  },
  page_title: {
    type: String,
    required: true,
  },
  parent_category_id: {
    type: String,
    required: true,
  },
  c_showInMenu: Boolean,
  image: {
    type: String,
    required: false,
  },
}, { collection: 'categories' });

module.exports = mongoose.model('Category', CategorySchema);
